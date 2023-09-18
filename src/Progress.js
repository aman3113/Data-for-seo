import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

export default function Progress({ categoryArr, onPageData }) {
  const { onpage_score } = onPageData;
  return (
    <section>
      <div>
        <CircularProgress
          value={onpage_score}
          color={`${onpage_score > 70 ? "green.400" : "red.300"}`}
          size="120px"
        >
          <CircularProgressLabel>{onpage_score}%</CircularProgressLabel>
        </CircularProgress>
        <p>On Page Score</p>
      </div>
      <div className="performance-container">
        {categoryArr.map((category, idx) => {
          const { title, score } = category;
          return (
            <div key={idx}>
              <CircularProgress
                value={score * 100}
                color={`${score * 100 > 70 ? "green.400" : "red.300"}`}
                size="80px"
              >
                <CircularProgressLabel>
                  {(score * 100).toFixed(0)}%
                </CircularProgressLabel>
              </CircularProgress>
              <p>{title}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
