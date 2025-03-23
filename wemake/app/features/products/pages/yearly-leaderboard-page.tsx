import { useParams } from 'react-router-dom';

export default function YearlyLeaderboardPage() {
  const { year } = useParams<{ year: string }>();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{year}년 연간 리더보드</h1>
      <p className="mb-6">{year}년 한 해 동안 가장 인기 있었던 제품들의 순위입니다.</p>

      <div className="flex gap-4 mb-8">
        <a
          href="/products/leaderboards"
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          전체 리더보드
        </a>
        <select
          className="px-4 py-2 border rounded"
          value={year}
          onChange={e => (window.location.href = `/products/leaderboards/yearly/${e.target.value}`)}
        >
          <option value="2023">2023년</option>
          <option value="2022">2022년</option>
          <option value="2021">2021년</option>
          <option value="2020">2020년</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">순위</th>
              <th className="py-3 px-4 text-left">제품명</th>
              <th className="py-3 px-4 text-left">카테고리</th>
              <th className="py-3 px-4 text-left">출시일</th>
              <th className="py-3 px-4 text-left">연간 점수</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">1</td>
              <td className="py-3 px-4">연간 인기 제품 1</td>
              <td className="py-3 px-4">소프트웨어</td>
              <td className="py-3 px-4">{year}-03-15</td>
              <td className="py-3 px-4">95.8</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">2</td>
              <td className="py-3 px-4">연간 인기 제품 2</td>
              <td className="py-3 px-4">하드웨어</td>
              <td className="py-3 px-4">{year}-01-20</td>
              <td className="py-3 px-4">92.5</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">3</td>
              <td className="py-3 px-4">연간 인기 제품 3</td>
              <td className="py-3 px-4">서비스</td>
              <td className="py-3 px-4">{year}-06-10</td>
              <td className="py-3 px-4">90.2</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">4</td>
              <td className="py-3 px-4">연간 인기 제품 4</td>
              <td className="py-3 px-4">소프트웨어</td>
              <td className="py-3 px-4">{year}-04-05</td>
              <td className="py-3 px-4">89.0</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">5</td>
              <td className="py-3 px-4">연간 인기 제품 5</td>
              <td className="py-3 px-4">하드웨어</td>
              <td className="py-3 px-4">{year}-09-12</td>
              <td className="py-3 px-4">87.9</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">{year}년 월별 트렌드</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4">월별 인기 제품 트렌드를 확인하세요:</p>
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
              <a
                key={month}
                href={`/products/leaderboards/monthly/${year}/${month}`}
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded text-center hover:bg-blue-200"
              >
                {month}월
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
