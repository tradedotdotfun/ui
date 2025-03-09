import apiClient from "./index.ts";

export type UserRequest = {
  round?: number;
  address: string;
}

export type UserResponse = {
  address: string;
  "usd_amount": number;
  "estimated_total_amount": number;
}

export const fetchUser: (request: UserRequest) => Promise<UserResponse | undefined> = async ({
  round = 0,
  address,
}) => {
  const response = await apiClient.get(`/account?round=${round}&address=${"7ENEt33c362bZVcxdgR4A1wNnffwSWHawan935Qw9Vya"}`);
  // const response = await apiClient.get(`/account?round=${round}&address=${address}`);

  if (response.data.length === 0) {
    return undefined;
  }

  return {
    address,
    ...response.data
  };
};
