export interface SearchGetDto {
  search_string: string;
  take: number;
  page: number;
  search_by_user_nickname: boolean; // default: true
  search_by_hashtag_name: boolean; // default: true
}
