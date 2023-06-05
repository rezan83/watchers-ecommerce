import { Box } from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

interface RatingProps {
  rating: number;
  numReviews?: number;

  setSelectRating?: (rate: number) => void;
}

export default function Rating({ rating, numReviews, setSelectRating }: RatingProps) {
  const updateRate = (i: number) => {
    if (setSelectRating) {
      setSelectRating(i + 1);
    }
  };
  return (
    <Box display="flex" alignItems="center">
      {Array(5)
        .fill('')
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                fontSize={setSelectRating ? 50 : ''}
                key={i}
                onClick={() => updateRate(i)}
                style={{ marginLeft: '1' }}
                color={i < rating ? 'yellow' : 'orange'}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return (
              <BsStarHalf
                fontSize={setSelectRating ? 50 : ''}
                onClick={() => updateRate(i)}
                key={i}
                style={{ marginLeft: '1' }}
              />
            );
          }
          return (
            <BsStar
              fontSize={setSelectRating ? 50 : ''}
              key={i}
              onClick={() => updateRate(i)}
              style={{ marginLeft: '1' }}
            />
          );
        })}
      {numReviews && (
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {numReviews} review{numReviews ? numReviews > 1 && 's' : ''}
        </Box>
      )}
    </Box>
  );
}
