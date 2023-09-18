export default function LighthouseReport({ categoryArr }) {
  return (
    <section>
      <h1>This is Report's Section.</h1>
      {categoryArr?.map((category, idx) => {
        const { title, score, categoryAudits } = category;
        return (
          <div key={idx} className="category-container">
            <h2>
              {title} - {(score * 100).toFixed(0)}%
            </h2>
            <div className="category-audits">
              {categoryAudits?.map((audit, idx) => {
                const { title, displayValue, description } = audit;

                const descriptionItems = description?.match(
                  /^(.*?)\[(.*?)\]\((.*?)\)/
                );
                return (
                  <div key={idx}>
                    <h3>
                      {title} - {displayValue}
                    </h3>
                    <p>
                      {descriptionItems && (
                        <>
                          <span>{descriptionItems[1]}</span>
                          <a
                            className="link"
                            href={descriptionItems[3]}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {descriptionItems[2]}
                          </a>
                          .
                        </>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
