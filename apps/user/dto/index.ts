export interface RequestParamDto {
    params: Record<string, string>;
    query: Record<string, string>;
    userId: number;
    body: Record<string, unknown>;
}
