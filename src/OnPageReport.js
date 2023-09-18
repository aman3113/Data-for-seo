export default function OnPageReport({ onPageData }) {
  console.log(onPageData);
  const { page_timing, checks } = onPageData;
  return (
    <section>
      <h1>Page resources timings</h1>
      <div className="page-container">
        {Object.entries(page_timing).map(([key, value], idx) => {
          return (
            <div key={idx} className="">
              <h3>{value}</h3>
              <p>{key}</p>
            </div>
          );
        })}
      </div>
      <h1> Checks</h1>
      <div className="page-container">
        {Object.entries(checks).map(([key, value], idx) => {
          return (
            <div key={idx} className={`${value ? "check-pass" : "check-fail"}`}>
              <p>{key}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
