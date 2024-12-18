import {
  getFollowUnfollowResponse,
  getIsFollowerStatusRequest,
  getIsFollowerStatusResponse,
  getLoginRequest,
  getLoginResponse,
  getNumFollowRequest,
  getNumFollowResponse,
  getUserRequest,
  getUserResponse,
  logoutRequest,
  PagedStatusItemRequest,
    PagedStatusItemResponse,
    PagedUserItemRequest,
    PagedUserItemResponse,
    postStatusRequest,
    postStatusResponse,
    registerRequest,
    Status,
    User,
    UserDto,
  } from "tweeter-shared";
  import { clientCommunicator } from "./clientCommunicator";
  
  export class serverFacade {
    private SERVER_URL = "https://o81zmwl32b.execute-api.us-east-1.amazonaws.com/dev";
  
    private clientCommunicator = new clientCommunicator(this.SERVER_URL);
  
    public async getMoreFollowees(
      request: PagedUserItemRequest
    ): Promise<[User[], boolean]> {
      const response = await this.clientCommunicator.doPost<
        PagedUserItemRequest,
        PagedUserItemResponse
      >(request, "/followee/list");
  
      // Convert the UserDto array returned by ClientCommunicator to a User array
      const items: User[] | null =
        response.success && response.items
          ? response.items.map((dto) => User.fromDto(dto) as User)
          : null;
  
      // Handle errors    
      if (response.success) {
        if (items == null) {
          throw new Error(`No followees found`);
        } else {
          return [items, response.hasMore];
        }
      } else {
        console.error(response);
        throw new Error(response.message ?? "An unknown error occurred.");

      }
    }

    public async getMoreFollowers(
      request: PagedUserItemRequest
    ): Promise<[User[], boolean]> {
      const response = await this.clientCommunicator.doPost<
        PagedUserItemRequest,
        PagedUserItemResponse
      >(request, "/follower/list");
  
      // Convert the UserDto array returned by ClientCommunicator to a User array
      const items: User[] | null =
        response.success && response.items
          ? response.items.map((dto) => User.fromDto(dto) as User)
          : null;
  
      // Handle errors    
      if (response.success) {
        if (items == null) {
          throw new Error(`No followers found`);
        } else {
          return [items, response.hasMore];
        }
      } else {
        console.error(response);
        throw new Error(response.message ?? "An unknown error occurred.");

      }
    }


    public async getMoreFeed(
      request: PagedStatusItemRequest
    ): Promise<[Status[], boolean]> {
      const response = await this.clientCommunicator.doPost<
        PagedStatusItemRequest,
        PagedStatusItemResponse
      >(request, "/feed/list");
  
      // Convert the UserDto array returned by ClientCommunicator to a User array
      const items: Status[] | null =
        response.success && response.items
          ? response.items.map((dto) => Status.fromDto(dto) as Status)
          : null;
  
      // Handle errors    
      if (response.success) {
        if (items == null) {
          throw new Error(`No more feed found`);
        } else {
          return [items, response.hasMore];
        }
      } else {
        console.error(response);
        throw new Error(response.message ?? "An unknown error occurred.");

      }
    }

    public async getMoreStory(
      request: PagedStatusItemRequest
    ): Promise<[Status[], boolean]> {
      const response = await this.clientCommunicator.doPost<
        PagedStatusItemRequest,
        PagedStatusItemResponse
      >(request, "/story/list");
  
      // Convert the UserDto array returned by ClientCommunicator to a User array
      const items: Status[] | null =
        response.success && response.items
          ? response.items.map((dto) => Status.fromDto(dto) as Status)
          : null;
  
      // Handle errors    
      if (response.success) {
        if (items == null) {
          throw new Error(`No more feed found`);
        } else {
          return [items, response.hasMore];
        }
      } else {
        console.error(response);
        throw new Error(response.message ?? "An unknown error occurred.");

      }
    }

    public async getPostStatus(
      request: postStatusRequest
    ): Promise<void> {
      const response = await this.clientCommunicator.doPost<
        postStatusRequest,
        postStatusResponse
      >(request, "/user/postStatus");
  
      // Convert the UserDto array returned by ClientCommunicator to a User array
      // Handle errors    
      if (response.success) {
        return
      } else {
        console.error(response);
        throw new Error(response.message ?? "An unknown error occurred.");

      }
    }


    public async getFollowerStatus(
      request: getIsFollowerStatusRequest
    ): Promise<boolean> {
      const response = await this.clientCommunicator.doPost<
      getIsFollowerStatusRequest,
      getIsFollowerStatusResponse
      >(request, "/user/followerStatus");
  
      // Convert the UserDto array returned by ClientCommunicator to a User array
  
      // Handle errors    
      if (response.success) {
        
          return response.following
      } else {
        console.error(response);
        throw new Error(response.message ?? "An unknown error occurred.");

      }
    }

    public async getFolloweeCount(
      request: getNumFollowRequest
    ): Promise<number> {
      const response = await this.clientCommunicator.doPost<
      getNumFollowRequest,
      getNumFollowResponse
      >(request, "/user/followee");
  
      // Convert the UserDto array returned by ClientCommunicator to a User array
  
      // Handle errors    
      if (response.success) {
        
          return response.numFollow
      } else {
        console.error(response);
        throw new Error(response.message ?? "An unknown error occurred.");

      }
    }

    public async getFollowerCount(
      request: getNumFollowRequest
    ): Promise<number> {
      const response = await this.clientCommunicator.doPost<
      getNumFollowRequest,
      getNumFollowResponse
      >(request, "/user/follower");
  
      // Convert the UserDto array returned by ClientCommunicator to a User array
  
      // Handle errors    
      if (response.success) {
        
          return response.numFollow
      } else {
        console.error(response);
        throw new Error(response.message ?? "An unknown error occurred.");

      }
    }

    public async follow(
      request: getNumFollowRequest
    ): Promise<[number, number]> {
      const response = await this.clientCommunicator.doPost<
      getNumFollowRequest,
      getFollowUnfollowResponse
      >(request, "/user/follow");
  
      // Convert the UserDto array returned by ClientCommunicator to a User array
  
      // Handle errors    
      if (response.success) {
        
        return [ response.followeeCount, response.followerCount ]

      } else {
        console.error(response);
        throw new Error(response.message ?? "An unknown error occurred.");

      }
    }

      public async unfollow(
      request: getNumFollowRequest
    ): Promise<[number, number]> {
      const response = await this.clientCommunicator.doPost<
      getNumFollowRequest,
      getFollowUnfollowResponse
      >(request, "/user/unfollow");
  
      // Convert the UserDto array returned by ClientCommunicator to a User array
  
      // Handle errors    
      if (response.success) {
        
        return [ response.followeeCount, response.followerCount ]
        
      } else {
        console.error(response);
        throw new Error(response.message ?? "An unknown error occurred.");

      }
    }

    public async getUser(
      request: getUserRequest
    ): Promise<User | null > {
      const response = await this.clientCommunicator.doPost<
      getUserRequest,
      getUserResponse
      >(request, "/user/user");
  
      // Convert the UserDto array returned by ClientCommunicator to a User array
  
      // Handle errors    
      if (response.success) {
        
        return (User.fromDto(response.User))
        
      } else {
        console.error(response);
        throw new Error(response.message ?? "An unknown error occurred.");

      }
    }


    public async login(
      request: getLoginRequest
    ): Promise<[User | null, string]> {
      const response = await this.clientCommunicator.doPost<
      getLoginRequest,
      getLoginResponse
      >(request, "/user/login");
  
      // Convert the UserDto array returned by ClientCommunicator to a User array
  
      // Handle errors    
      if (response.success) {
        
        return [ User.fromDto(response.User), response.Token ]
        
      } else {
        console.error(response);
        throw new Error(response.message ?? "An unknown error occurred.");

      }
    }


    
    public async register(
      request: registerRequest
    ): Promise<[User | null, string]> {
      const response = await this.clientCommunicator.doPost<
      registerRequest,
      getLoginResponse
      >(request, "/user/register");
  
      // Convert the UserDto array returned by ClientCommunicator to a User array
  
      // Handle errors    
      if (response.success) {
        
        return [ User.fromDto(response.User), response.Token ]
        
      } else {
        console.error(response);
        throw new Error(response.message ?? "An unknown error occurred.");

      }
    }


    
    public async logout(
      request: logoutRequest
    ): Promise<void> {
      const response = await this.clientCommunicator.doPost<
      logoutRequest,
      postStatusResponse
      >(request, "/user/logout");
  
      // Convert the UserDto array returned by ClientCommunicator to a User array
  
      // Handle errors    
      if (response.success) {
        
        return
        
      } else {
        console.error(response);
        throw new Error(response.message ?? "An unknown error occurred.");

      }
    }
  }