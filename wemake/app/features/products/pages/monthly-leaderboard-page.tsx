import { useParams } from 'react-router-dom';

export default function MonthlyLeaderboardPage() {
  const { year, month } = useParams<{ year: string; month: string }>();

  // 월 이름 배열
  const monthNames = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  // 월 이름 가져오기
  const monthName = monthNames[parseInt(month || '1') - 1];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">
        {year}년 {monthName} 월간 리더보드
      </h1>
      <p className="mb-6">
        {year}년 {monthName}에 가장 인기 있었던 제품들의 순위입니다.
      </p>

      <div className="flex gap-4 mb-8">
        <a
          href="/products/leaderboards"
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          전체 리더보드
        </a>
        <a
          href={`/products/leaderboards/yearly/${year}`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {year}년 연간 리더보드
        </a>

        <select
          className="px-4 py-2 border rounded"
          value={month}
          onChange={e =>
            (window.location.href = `/products/leaderboards/monthly/${year}/${e.target.value}`)
          }
        >
          {monthNames.map((name, index) => (
            <option key={index + 1} value={index + 1}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">순위</th>
              <th className="py-3 px-4 text-left">제품명</th>
              <th className="py-3 px-4 text-left">카테고리</th>
              <th className="py-3 px-4 text-left">월간 점수</th>
              <th className="py-3 px-4 text-left">변동</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">1</td>
              <td className="py-3 px-4">월간 인기 제품 1</td>
              <td className="py-3 px-4">소프트웨어</td>
              <td className="py-3 px-4">9.8</td>
              <td className="py-3 px-4 text-green-600">↑ 2</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">2</td>
              <td className="py-3 px-4">월간 인기 제품 2</td>
              <td className="py-3 px-4">하드웨어</td>
              <td className="py-3 px-4">9.5</td>
              <td className="py-3 px-4 text-red-600">↓ 1</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">3</td>
              <td className="py-3 px-4">월간 인기 제품 3</td>
              <td className="py-3 px-4">서비스</td>
              <td className="py-3 px-4">9.2</td>
              <td className="py-3 px-4 text-green-600">↑ 5</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">4</td>
              <td className="py-3 px-4">월간 인기 제품 4</td>
              <td className="py-3 px-4">소프트웨어</td>
              <td className="py-3 px-4">9.0</td>
              <td className="py-3 px-4 text-gray-400">-</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">5</td>
              <td className="py-3 px-4">월간 인기 제품 5</td>
              <td className="py-3 px-4">하드웨어</td>
              <td className="py-3 px-4">8.9</td>
              <td className="py-3 px-4 text-red-600">↓ 2</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          {year}년 {monthName} 주간 트렌드
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4">주간 인기 제품 트렌드를 확인하세요:</p>
          <div className="grid grid-cols-5 gap-4">
            {Array.from({ length: 5 }, (_, i) => i + 1).map(week => {
              // 간단한 주 계산 (실제로는 더 복잡한 로직이 필요할 수 있음)
              const weekNumber = (parseInt(month || '1') - 1) * 4 + week;
              return (
                <a
                  key={week}
                  href={`/products/leaderboards/weekly/${year}/${weekNumber}`}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded text-center hover:bg-blue-200"
                >
                  {week}주차
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
