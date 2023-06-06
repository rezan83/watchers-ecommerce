import { IReview } from '@types';
import env from 'config/env';
import axiosInstance from './axiosInterceptors';

// export const fetchReviews = async (): Promise<IReview[]> => {
//     let reviews: IReview[] = [];
//     try {
//       const reviewsRes = await axiosInstance.get(env.ALL_REVIEWS_URL!);
//       reviews = await reviewsRes.data;
//     } catch (error) {
//       console.log(error);
//     }
//     return reviews;
//   };

export const addOrUpdateReview = async (newReview: IReview): Promise<IReview | null> => {
  let review: IReview | null = null;
  try {
    const reviewRes = await axiosInstance.post(env.ALL_REVIEWS_URL!, { ...newReview });
    review = await reviewRes.data.review;
  } catch (error) {
    console.log(error);
  }
  return review;
};

export const fetchProductReview = async (productId: string): Promise<IReview | null> => {
  let review: IReview | null = null;
  try {
    const reviewRes = await axiosInstance.get(env.ALL_REVIEWS_URL! + productId);
    review = await reviewRes.data;
  } catch (error) {
    console.log(error);
  }
  return review;
};
