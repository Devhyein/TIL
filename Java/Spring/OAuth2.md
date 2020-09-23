### Spring Security와 OAuth2를 이용한 구글 로그인 구현

1. 구글 서비스 등록
  https://console.cloud.google.com/?pli=1

2. User.java DTO 생성
```java
package com.ssafy.bigdata.dto.user;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
public class User {
    private int user_id;
    private String email;
    private String name;
    private String picture;
    private Role role;
    private int team_id;

    @Builder
    public User(String name, String email, String picture, Role role) {
        this.name = name;
        this.email = email;
        this.picture = picture;
        this.role = role;
    }

    public User update(String name, String picture) {
        this.name = name;
        this.picture = picture;

        return this;
    }

    public String getRoleKey(){
        return this.role.getKey();
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setTeam_id(int team_id) {
        this.team_id = team_id;
    }

}

```

3. Role.java 생성
```java
package com.ssafy.bigdata.dto.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    GUEST("ROLE_GUEST", "손님")
    , USER("ROLE_USER", "일반 사용자");

    private final String key;
    private final String title;
}
```

#### JPA를 이용하는 경우 여기서 UserRepository.java를 생성하지만 나는 JPA를 사용하지 않고 Mybatis를 사용하였기 때문에 생략.
#### 이메일이 이미 등록된 이메일인지에 대한 체크는 나중에 dao로 따로 해줌

### 스프링 시큐리티 설정
4. SecurityConfig.java
```java
package com.ssafy.bigdata.config.auth;

import lombok.RequiredArgsConstructor;

import com.ssafy.bigdata.dto.user.Role;

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@RequiredArgsConstructor
@EnableWebSecurity // (1)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CustomOAuth2UserService customOAuth2UserService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().headers().frameOptions().disable() // (2)
                .and()
                    .authorizeRequests() // (3)
                    .antMatchers("/","/css/**","/images/**","/js/**","/h2-console/**").permitAll()
                    .antMatchers("/api/v1/**").hasRole(Role.GUEST.name()) // (4)
                    .anyRequest().authenticated() // (5)
                .and()
                    .logout()
                        .logoutSuccessUrl("/") // (6)
                .and()
                    .oauth2Login()// (7)
                        .userInfoEndpoint() // (8)
                            .userService(customOAuth2UserService); // (9)
    }
}
```

5. CustonOAuth2UserService.java
```java
package com.ssafy.bigdata.config.auth;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

import com.ssafy.bigdata.config.auth.dto.OAuthAttributes;
import com.ssafy.bigdata.config.auth.dto.SessionUser;
import com.ssafy.bigdata.dao.user.UserDao;
import com.ssafy.bigdata.dto.user.Role;
import com.ssafy.bigdata.dto.user.User;

import java.util.Collections;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final HttpSession httpSession;    
    private UserDao userDao;

    @Autowired
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId(); // (1)
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint()
                .getUserNameAttributeName(); // (2)

        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName,
                oAuth2User.getAttributes()); // (3)

        User user = saveOrUpdate(attributes);
        httpSession.setAttribute("user", new SessionUser(user)); // (4)

        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority(user.getRoleKey())),
                attributes.getAttributes(), attributes.getNameAttributeKey());
    }

    private User saveOrUpdate(OAuthAttributes attributes) { // (5)
        Optional<User> user = userDao.findByEmail(attributes.getEmail());
        User newUser = new User();
        if(user.isPresent()){
            // 이미 있는 유저
            System.out.println("이미 존재하는 유저입니다. update필요..?");
            newUser.setEmail(user.get().getEmail());
            newUser.setName(user.get().getName());
            newUser.setPicture(user.get().getPicture());
            newUser.setRole(Role.GUEST);

            // update 필요?
        } else {
            // 새로 가입
            System.out.println("새로 가입");
            newUser.setEmail(attributes.getEmail());
            newUser.setName(attributes.getName());
            newUser.setPicture(attributes.getPicture());
            newUser.setRole(Role.GUEST);
            // 저장
            userDao.save(newUser);
            
        }

        return newUser;

    }
}
```

6. OAuthAttributes.java
```java
package com.ssafy.bigdata.config.auth.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.Map;

import com.ssafy.bigdata.dto.user.Role;
import com.ssafy.bigdata.dto.user.User;

@Getter
public class OAuthAttributes {
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String name;
    private String email;
    private String picture;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes,
                           String nameAttributeKey, String name,
                           String email, String picture) {
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.name = name;
        this.email = email;
        this.picture = picture;
    }

    // (1)
    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes) {
        if("naver".equals(registrationId)) {
            return ofNaver("id", attributes);
        }

        return ofGoogle(userNameAttributeName, attributes);
    }

    private static OAuthAttributes ofGoogle(String userNameAttributeName,
                                            Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .picture((String) attributes.get("picture"))
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    private static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        return OAuthAttributes.builder()
                .name((String) response.get("name"))
                .email((String) response.get("email"))
                .picture((String) response.get("profile_image"))
                .attributes(response)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    // (2)
    public User toEntity() {
        return User.builder()
                .name(name)
                .email(email)
                .picture(picture)
                .role(Role.GUEST)
                .build();
    }
}
```

7. SessionUser.java
```java
package com.ssafy.bigdata.config.auth.dto;

import lombok.Getter;

import java.io.Serializable;

import com.ssafy.bigdata.dto.user.User;

@Getter
public class SessionUser implements Serializable {
    private String name;
    private String email;
    private String picture;

    public SessionUser(User user) {
        this.name = user.getName();
        this.email = user.getEmail();
        this.picture = user.getPicture();
    }
}
```
