export default function LeaderboardPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">제품 리더보드</h1>
      <p className="mb-6">인기 있는 제품들의 순위를 확인해보세요.</p>

      <div className="flex gap-4 mb-8">
        <a href="/products/leaderboards/yearly/2023" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          연간 리더보드
        </a>
        <a href="/products/leaderboards/monthly/2023/12" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          월간 리더보드
        </a>
        <a href="/products/leaderboards/weekly/2023/52" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          주간 리더보드
        </a>
        <a href="/products/leaderboards/daily/20231231" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          일간 리더보드
        </a>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">순위</th>
              <th className="py-3 px-4 text-left">제품명</th>
              <th className="py-3 px-4 text-left">카테고리</th>
              <th className="py-3 px-4 text-left">점수</th>
              <th className="py-3 px-4 text-left">변동</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">1</td>
              <td className="py-3 px-4">인기 제품 1</td>
              <td className="py-3 px-4">소프트웨어</td>
              <td className="py-3 px-4">9.8</td>
              <td className="py-3 px-4 text-green-600">↑ 2</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">2</td>
              <td className="py-3 px-4">인기 제품 2</td>
              <td className="py-3 px-4">하드웨어</td>
              <td className="py-3 px-4">9.5</td>
              <td className="py-3 px-4 text-red-600">↓ 1</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">3</td>
              <td className="py-3 px-4">인기 제품 3</td>
              <td className="py-3 px-4">서비스</td>
              <td className="py-3 px-4">9.2</td>
              <td className="py-3 px-4 text-gray-400">-</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">4</td>
              <td className="py-3 px-4">인기 제품 4</td>
              <td className="py-3 px-4">소프트웨어</td>
              <td className="py-3 px-4">9.0</td>
              <td className="py-3 px-4 text-green-600">↑ 3</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">5</td>
              <td className="py-3 px-4">인기 제품 5</td>
              <td className="py-3 px-4">하드웨어</td>
              <td className="py-3 px-4">8.9</td>
              <td className="py-3 px-4 text-red-600">↓ 2</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
} 