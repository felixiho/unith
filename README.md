
## Unith Assessment

### Tools and Technologies 
1. NextJs Framework (APP Router)
2. Redux for state management 
3. Tailwind for CSS 
4. Axios for handling API calls
5. Jest for unit tests

### Running APP
We can run the appp either via Docker or locally using npm. 

#### Using Docker
Build container
```bash
docker build -t unith .
```

Run container
```bash
docker run -p 3000:3000 unith
```

#### Using NPM 
install dependencies
```bash
npm install
```
Run app
```bash
npm run dev
```

#### Tests
To run tests:
```bash
npm run test
```
