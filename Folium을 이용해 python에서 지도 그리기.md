### folium
  : 좌표값을 지도로 시각화하여 지도 데이터를 사용할 수 있게 해주는 파이썬 내부 지리정보 시각화 모듈
  
### 간단한 생성 예제
```python
import folium
 
m = folium.Map(location=[37.564214, 127.001699], tiles="OpenStreetMap", zoom_start=15)
m.save('map.html')
```
![캡처](https://user-images.githubusercontent.com/29700816/91993780-c2e30780-ed70-11ea-9fbf-fa99c8f6c126.PNG)

### 원하는 위치에 marker 표시하는 예제
```python
m1 = folium.Map(
	location=[37.564214, 127.001699], tiles="OpenStreetMap", zoom_start=15)
    

    folium.Marker(location=[37.564214, 127.001699],
        icon=folium.Icon(color='red'),
        popup="Center of seoul").add_to(m1)

    m1.save('map.html')
    webbrowser.open_new("map.html")
```
![캡처](https://user-images.githubusercontent.com/29700816/91993895-e7d77a80-ed70-11ea-97c6-26ca6440f237.PNG)
