# test12 — 데이터 대시보드 프로젝트

샘플 매출 데이터를 보여주는 **데이터 대시보드**를 여러 형태로 만든 프로젝트입니다.

- 🌐 **웹 대시보드** (`dashboard/`): 순수 HTML/JS 한 페이지, Vercel 배포용
- 🤖 **Android 앱** (`apk-project/`): 웹 대시보드를 담은 WebView 앱
- 📱 **Expo 앱** (`dashboard-app/`): React Native(Expo)로 만든 모바일 대시보드

## 기능

- 총 매출, 총 주문 수, 평균 주문액 요약 카드
- 월별 매출 추이, 카테고리별 매출 차트
- 카테고리 필터 및 상세 내역 표
- (웹) CSV 파일 불러오기

샘플 데이터 CSV 형식:

```csv
date,category,product,qty,amount
2026-01-05,전자제품,무선이어폰,2,118000
```

## 폴더 구조

```
test12/
├── dashboard/          # 웹 대시보드
│   ├── index.html
│   └── vercel.json
├── apk-project/        # Android WebView 앱 (Gradle)
│   ├── app/
│   ├── build.gradle
│   └── settings.gradle
├── dashboard-app/      # Expo(React Native) 앱
│   ├── App.js
│   ├── index.js
│   ├── app.json
│   └── package.json
└── README.md
```

## 실행 방법

### 1. 웹 대시보드

`dashboard/index.html`을 브라우저로 열면 됩니다. 별도 빌드는 필요 없습니다.

배포는 Vercel 또는 Netlify에서 `dashboard/` 폴더를 지정하면 됩니다.

### 2. Android 앱 (APK)

1. `apk-project/app/src/main/assets/` 안에 `dashboard/index.html`을 `index.html`로 복사합니다.
2. Android Studio로 `apk-project/`를 열고 빌드합니다. 또는 명령줄에서 실행합니다.

```bash
cd apk-project
./gradlew :app:assembleDebug
```

요구사항: JDK 17, Android SDK (platform 34, build-tools 34)

> 차트 라이브러리를 CDN에서 불러오므로 기기가 인터넷에 연결되어 있어야 합니다.

### 3. Expo 앱

```bash
cd dashboard-app
npm install
npx expo start
```

터미널에 표시되는 QR 코드를 휴대폰의 **Expo Go** 앱으로 스캔하면 실행됩니다.

## 참고

- 샘플 데이터는 각 앱 코드 안에 들어 있습니다. 실제 데이터를 쓰려면 CSV 불러오기 기능을 사용하거나 데이터 소스를 연결하세요.
- Android 빌드는 디버그 키로 서명된 APK입니다. Play 스토어 배포에는 릴리스 키 서명이 필요합니다.
