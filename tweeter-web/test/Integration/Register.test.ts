// import 'isomorphic-fetch';
// import { serverFacade } from "../../../tweeter-web/src/model/service/networkLayer/serverFacade";
// import { registerRequest } from 'tweeter-shared';

// describe("ServerFacade Integration Tests", () => {
//   const facade = new serverFacade();
  
//   beforeAll(() => {
//     if (!global.fetch) {
//       global.fetch = fetch;
//     }
//   });

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test("Register - should register a new user successfully", async () => {
//     const request: registerRequest = {
//         firstName: "Test",
//         lastName: "User",
//         alias: "@testuser_" + Math.floor(Math.random() * 10000),
//         password: "password123",
//         imageStringBase64: "gggg",  // Convert to Buffer
//         imageFileExtension: "png"
//     };

//     try {
//       const [user, token] = await facade.register(request);
      
//       expect(user).toBeDefined();
//       expect(user?.firstName).toBe("Allen");
//       expect(user?.lastName).toBe("Anderson");
//       expect(token).toBeTruthy();
//     } catch (error: any) {
//       console.error('Register test failed:', error);
//       throw error;
//     }
//   });

//   test("GetUser - should fetch user details successfully", async () => {
//     const request: registerRequest = {
//         firstName: "Test",
//         lastName: "User",
//         alias: "@testuser_" + Math.floor(Math.random() * 10000),
//         password: "password123",
//         imageStringBase64: "ffff",  // Convert to Buffer
//         imageFileExtension: "png"
//     };

//     try {
//       const [registeredUser, token] = await facade.register(request);
//       expect(registeredUser).toBeDefined();

//       if (!registeredUser || !token) {
//         throw new Error("Registration failed - user or token is null");
//       }

//       const getUserRequest = {
//         alias: registeredUser.alias,
//         token: token
//       };

//       const user = await facade.getUser(getUserRequest);
//       expect(user).toBeDefined();
//       if (user) {
//         expect(user.firstName).toBe("Allen");
//         expect(user.lastName).toBe("Anderson");
//       }
//     } catch (error: any) {
//       console.error('GetUser test failed:', error);
//       throw error;
//     }
//   });

//   test("Login - should log in a user and return user details and token", async () => {
//     const request: registerRequest = {
//         firstName: "Test",
//         lastName: "User",
//         alias: "@testuser_" + Math.floor(Math.random() * 10000),
//         password: "password123",
//         imageStringBase64: "fffff",  // Convert to Buffer
//         imageFileExtension: "png"
//     };

//     try {
//       const [registeredUser] = await facade.register(request);
//       expect(registeredUser).toBeDefined();

//       if (!registeredUser) {
//         throw new Error("Registration failed - user is null");
//       }

//       const loginRequest = {
//         alias: registeredUser.alias,
//         password: request.password
//       };

//       const [user, token] = await facade.login(loginRequest);
//       expect(user).toBeDefined();
//       if (user) {
//         expect(user.firstName).toBe("Allen");
//         expect(user.lastName).toBe("Anderson");
//         expect(token).toBeTruthy();
//       }
//     } catch (error: any) {
//       console.error('Login test failed:', error);
//       throw error;
//     }
//   });

//   test("GetMoreFollowers - should fetch followers list successfully", async () => {
//     const request = {
//       userAlias: "@testuser",
//       pageSize: 10,
//       lastItem: null,
//       token: "test-token"
//     };

//     const [followers, hasMore] = await facade.getMoreFollowers(request);
//     expect(Array.isArray(followers)).toBe(true);
//     expect(typeof hasMore).toBe("boolean");
//   });

//   test("GetFollowerCount - should fetch the follower count", async () => {
//     const user = {
//       firstName: "John",
//       lastName: "Doe",
//       alias: "@johndoe",
//       imageUrl: "https://example.com/image.jpg"
//     };
    
//     const request = { 
//       token: "test-token", 
//       user 
//     };

//     const count = await facade.getFollowerCount(request);
//     expect(typeof count).toBe("number");
//     expect(count).toBeGreaterThanOrEqual(0);
//   });
// });