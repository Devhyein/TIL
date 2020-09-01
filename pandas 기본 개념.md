### Pandas
 - 구조화된 데이터의 처리를 지원하여 데이터 분석 및 가공에 사용되는 파이썬 라이브러리
 - numpy와 통합하여 강력한 스프레드시트 처리 기능을 제공
 - 인덱싱, 연산용 함수, 전처리 함수 등을 제공
 - import pandas as pd 로 pandas를 설치한 후 사용
 - 기본적으로 정의되는 자료구조로 Series와 Dataframe이 있다.

### Dataframe
 - 딕셔너리형태로 data를 정의해준 뒤 dataframe을 정의 (numpy의 array도 사용 가능)

  dataframe을 df라 할 때
  ```python
  df.columns # 칼럼명 목록
  df.index # 인덱스 목록
  df.values # 인덱스를 제외한 나머지 칼럼들의 값 목록
  df.칼럼명 # df['칼럼명'] # 해당 칼럼 출력

  df.columns.tolist() # 필드명 리스트

  # 값이 발생하는 빈도 구하는 법 3가지
  df.groupby().count()
  Series.value_counts()
  df.groupby().size()
  ```

### Series
 - pd.Series()함수로 정의, list나 numpy의 array가 인자로 입력
 - index와 values가 동시에 확인됨
 - 값과 함께 원하는 index를 입력할 수 있는게 특징
 - dataframe에서 인자에 인덱스 정의할 떄는 무조건 ""지만 Series는 ''나 ""나 상관 없다.
 - Series의 이름과 index에 이름 지정 가능
