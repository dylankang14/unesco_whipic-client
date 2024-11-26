# 유네스코 세계유산국제해석설명센터 파일관리자 시스템

[[_TOC_]]

## NextJS v14 기본 정보

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 프로젝트 구성

1. 프론트엔드 (package.json 참고)

   - HTML5, CSS3
   - JavaScript, TypeScript
   - CSS Framework: TailwindCSS v3.4
   - Framework: Next.js v14

2. 인프라 환경

   1. 서버(vm) 리스트 및 세부내역

   <table>
   <thead>
   <tr>
   <th rowspan="2">번호</th>    <th colspan="3">서버 IP</th>    <th rowspan="2">서버명</th>    <th rowspan="2">운영체제</th>    <th rowspan="2">CPU<br>(core)</th>    <th rowspan="2">RAM<br>(GB)</th>    <th rowspan="2">스토리지<br>(GB)</th>    </tr>
   <tr>
   <th>Public</th>   <th>Private</th>   <th>Subnet</th>   </tr>
   </thead>
   <tbody>
   <tr>
   <td>1</td>   <td>****</td>   <td>****</td>   <td>Public</td>   <td>WEB</td>   <td>Ubuntu 22.04</td>   <td>2</td>   <td>4</td>   <td>HDD 50</td>   </tr>
   <tr>
   <td>2</td>   <td></td>   <td>****</td>   <td>Private</td>   <td>WAS_DB</td>   <td>Ubuntu 22.04</td>   <td>2</td>   <td>4</td>   <td>HDD 50 + 1000</td>   </tr>
   </tbody>
   </table>

   2. 서버 접속 정보 및 설치 프로그램

      - 접속 정보

        - 두 개 서버 모두 동일합니다.
        - 방화벽에서 차단되기 때문에 접속이 필요한 IP를 보내주시기 바랍니다.

   3. SSL VPN

      - 접속 방법

        - orgcloud-vpn-3.gabia.com
        - 위의 URL 접속 후 계정 정보 입력

---

## 프로젝트 상세

1. 프레임워크 기본 설정

   1. Next.js 14버전

      - App route 사용
      - TypeScript 사용
      - 미들웨어 사용
      - API route 사용

   2. CSS - TailwindCSS

      - DaisyUI 플러그인 사용

   3. Library

      - Zod (Validation library)
      - react-datepicker (Date selector)

   4. Etc

      - 전역 상태관리 라이브러리 없음

        Next.js 는 백엔드와 프론트엔드가 함께 있는 프레임웤이라서 상태관리 라이브러리를 채용하는 순간 백엔드와 프론트엔드간의 데이터 불일치 문제가 발생.
        사용하려면 사용할 수 있으나 모든 페이지와 컴퍼넌트들이 SSR을 사용하지 못하고 클라이언트 컴퍼넌트를 강제당하게 된다. 그러한 이유로 Next.js에서 제공하는 백엔드 기능을 최대한 살려서 구현하기 위해 전역 상태관리 라이브러리를 채용하지 않고 개발하였다.

        Next.js에서의 fetch api는 기본적인 fetch api와는 동작 방식이 다르다. fetch는 백엔드 단에서 수행되며, 해당 응답값은 자동으로 캐싱된다. 마치 SWR, React Query 등과 같은 캐싱기능이 있다. 그러므로 api를 통해 받은 데이터를 여러번 반복해도 서버에 큰 부하를 주지 않는다.

2. 설계 구조

   1. 프론트엔드와 백엔드 분리

      - 백엔드 서버는 단순히 Rest api 서버로 작동한다.
      - 프론트엔드는 데이터베이스 상의 필요한 데이터를 api를 통해 통신해 받는다.
      - 특이사항으로 로그인 및 인증방식으로 JWT를 사용하는데, 이 토큰의 핸들링은 프론트단에서 처리한다.

   2. 백엔드

      - 최초 기획시 전자정부프레임워크를 사용하려 하였으나 문제가 발생하여 JAVA Spring boot로 선회하였다.
      - 데이터 베이스는 MariaDB가 사용 되었다.
      - 로그인 api 외의 모든 api 요청에는 "Authorization", "x-auth-token" 두개의 토큰이 필요하다. 두개중 하나라도 없을시엔 401 에러를 응답으로 받게된다.
      - "Authorization" 토큰 값은 상수값으로 "libs/fetcher.ts" 파일안에 있다.
      - 최초 로그인시에 로그인 api의 응답값으로 "accessToken", "refreshToken" 두개의 토큰을 받게 된다. 해당 토큰에는 생명주기값도 있으므로, 이를 받아서 프론트단에서 처리한다. 현재 "accessToken"은 1시간, "refreshToken"은 24시간으로 설정되어 있다.
      - "accessToken" 을 api 요청 헤더에 "x-auth-token"에 담아서 보내야한다.
      - http://\*\*\*\*/swagger-ui/index.html 스웨거 주소이다.

   3. 프론트엔드

      - 반응형 웹으로 구현하였으며, 최소 태블릿에서의 사용이 요구사항이며, 이를 만족하도록 구현되어 있다.
      - TypeScript 사용으로 타입에 대한 오류가 있을 경우에 빌드되지 않으며, 빌드되지 않는 경우에는 배포가 실패한다.
      - Next.js는 기본적으로 React 기반 프레임웤이기에 React의 문법들이 100퍼센트 호환된다. Next.js는 React 와 거의 비슷하다.
      - 미들웨어 : 미들웨어는 프론트단에서 백엔드단으로 보내는 api 요청을 중간에서 캐치한다. 현재는 토큰이 없는 경우에는 어떠한 페이지로 이동하든 캐치해서 로그인 페이지로 강제로 보내진다. 폐쇄적인 웹 환경 구성의 기본은 미들웨어에 있다. 루트경로의 middleware.ts 파일을 참고.
      - customFetch : "libs/fetcher.ts" 상에 구현된 High Order Function이다. 로그인 요청외에는 모두 토큰값을 프론트단에서 셋팅해서 보내야 하므로, 로그인 외의 api fetch 요청에는 모두 customFetch를 사용한다.
      - 현재 Next.js 에서 사용 가능한 api 요청은 api route, actions.ts, 직접 fetch, 총 3가지의 방식이 있다. 현재는 모두 사용중이며, 바쁜 일정에 다소 혼재되어 있다.
      - api route : "nextApi/" 경로를 사용한다.
      - actions.ts : actions.ts 는 컴퍼넌트에서 form action을 사용하는 방식이다. 폼데이터를 받아서 api 요청을 보내고 받는다.
      - 직접 fetch : 기본 fetch 는 어디서든 사용가능한 전통적인 방식이다. 하지만 현재 프로젝트 상에서는 기본 fetch는 사용하지 않는다. 모두 customFetch를 사용해야한다.
      - 폼데이터나 api요청 payload 값의 validation 을 위해 zod를 채용하였다.
      - http://\*\*\*\* 웹서비스 주소이다.

3. Api 동작 방식

   1. 로그인 api : 기본 fetch를 사용하여 요청을 보내고 아이디와 비밀번호가 일치하면 응답으로 "accessToken", "refreshToken" 두개의 토큰을 받게 된다.
   2. customFetch는 기본적인 fetch api를 확장한것으로 "x-auth-token", "Authorization" 두개의 토큰값을 헤더에 담아서 보내게 된다. customFetch는 기본적으로 백엔드에서 실행된다.
   3. 응답값은 기본적으로 아래와 같은 타입을 갖는다.

      ```
      {
      ok: response.ok,
      status: response.status,
      headers: response.headers,
      data: result,
      };
      ```

      해당 응답값과 타입이 다른경우에 타입스크립트가 오류를 발생시킨다.

   4. 이외에는 기본적인 fetch와 동일하게 사용하면 된다.
   5. "accessToken"이 만료된 경우 백엔드 서버에선 response.status 401을 준다. 이때에 customFetch에서 401응답값을 받게되면 자동으로 "refreshToken api" 요청을 보내고 다시한번 api 요청을 보내게 되어 있다. "refreshToken api"는 "refreshToken" 을 보내서 대조한뒤 새로운 "accessToken"을 발행해서 응답한다. customFetch는 이를 다시 자동으로 "x-auth-token"으로 설정한다.
   6. 로그아웃 api를 요청을 보내면서 Nextjs 백엔드단에서 모든 토큰을 삭제하고 로그인 페이지로 강제로 보낸다.

4. 주요 기능

   1. 폴더 생성, 수정, 삭제

      - 수정은 리네임만.
      - 폴더 삭제는 최고관리자만 가능.
      - 폴더 삭제시 해당 폴더내의 모든 폴더와 파일은 함께 삭제됨.

   2. 파일 업로드, 다운로드, 수정, 삭제, 외부링크, 해시태그

      - 속성: 파일위치, 소유자 권한, 외부링크 등이 있다.
      - 업로드 제한: 파일갯수 제한은 없으며, 파일 용량의 총합이 1,000MB를 초과할 수 있다. 파일 크기 제한은 백엔드단과 Nginx설정과 프론트단에서도 zod를 통해 검증하게 되어 있다. 그전에 서버가 타임아웃되는 일이 있을수 있다.

   3. 검색기능

      - 검색은 파일만 검색
      - 검색의 대상은 파일명과 해시태그

   4. 계정

      - 최고관리자, 4개 부서의 계정. 총 5개의 계정만 있다.
      - 최고관리자만 모든 부서의 비밀번호 리셋가능
      - 최고관리자만 모든 부서의 열람 가능여부 컨트롤 가능
      - 최고관리자만 로그 히스토리 열람가능
