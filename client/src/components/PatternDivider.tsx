interface PatternDividerProps {
  pattern?: "primary" | "african";
}

export default function PatternDivider({ pattern = "primary" }: PatternDividerProps) {
  const patternClass = pattern === "african" ? "african-pattern" : "pattern-divider";
  
  return (
    <div 
      className={`${patternClass} h-16`}
      style={{
        backgroundImage: pattern === "primary"
          ? `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B4513' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          : `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D2B48C' fill-opacity='0.15'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20zM0 40h20v20H0V40zm40-40h20v20H40V0zm0 40h20v20H40V40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}
    />
  );
}
