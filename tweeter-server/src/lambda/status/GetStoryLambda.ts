import { PagedStatusItemRequest, PagedStatusItemResponse } from "tweeter-shared"
import { StatusService } from "../../model/service/StatusService";
import { DynamoFactory } from "../../model/implimentations/DynamoFactory";

export const handler = async (request: PagedStatusItemRequest): Promise<PagedStatusItemResponse> => {
    const followService = new StatusService(new DynamoFactory());
    const [items, hasMore] = await followService.loadMoreStoryItems(request.token, request.userAlias, request.pageSize, request.lastItem)

    return {
        success: true,
        message: null,
        items: items,
        hasMore: hasMore
    }
}
