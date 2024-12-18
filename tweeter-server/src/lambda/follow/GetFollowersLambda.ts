import { PagedUserItemRequest, PagedUserItemResponse } from "tweeter-shared"
import { FollowService } from "../../model/service/FollowService";
import { DynamoFactory } from "../../model/implimentations/DynamoFactory";

export const handler = async (request: PagedUserItemRequest): Promise<PagedUserItemResponse> => {
    const followService = new FollowService(new DynamoFactory());
    const [items, hasMore] = await followService.loadMoreFollowers(request.token, request.userAlias, request.pageSize, request.lastItem)

    return {
        success: true,
        message: null,
        items: items,
        hasMore: hasMore
    }
}
