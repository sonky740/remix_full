import { useParams } from 'react-router-dom';

export default function DailyLeaderboardPage() {
  const { day } = useParams<{ day: string }>();

  // 날짜 형식 변환 (예: 20231231 -> 2023년 12월 31일)
  const formatDate = (dateString: string) => {
    if (!dateString || dateString.length !== 8) return '날짜 정보 없음';

    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const date = dateString.substring(6, 8);

    return `${year}년 ${parseInt(month)}월 ${parseInt(date)}일`;
  };

  const formattedDate = formatDate(day || '');

  // 이전 날짜와 다음 날짜 계산 (간단한 예시)
  const calculateAdjacentDate = (dateString: string, offset: number) => {
    if (!dateString || dateString.length !== 8) return '';

    const year = parseInt(dateString.substring(0, 4));
    const month = parseInt(dateString.substring(4, 6)) - 1; // JavaScript의 월은 0부터 시작
    const date = parseInt(dateString.substring(6, 8));

    const currentDate = new Date(year, month, date);
    currentDate.setDate(currentDate.getDate() + offset);

    const nextYear = currentDate.getFullYear();
    const nextMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const nextDay = String(currentDate.getDate()).padStart(2, '0');

    return `${nextYear}${nextMonth}${nextDay}`;
  };

  const previousDay = calculateAdjacentDate(day || '', -1);
  const nextDay = calculateAdjacentDate(day || '', 1);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{formattedDate} 일간 리더보드</h1>
      <p className="mb-6">{formattedDate}에 가장 인기 있었던 제품들의 순위입니다.</p>

      <div className="flex gap-4 mb-8">
        <a href="/products/leaderboards" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
          전체 리더보드
        </a>

        {previousDay && (
          <a href={`/products/leaderboards/daily/${previousDay}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            이전 날짜
          </a>
        )}

        {nextDay && (
          <a href={`/products/leaderboards/daily/${nextDay}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            다음 날짜
          </a>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">순위</th>
              <th className="py-3 px-4 text-left">제품명</th>
              <th className="py-3 px-4 text-left">카테고리</th>
              <th className="py-3 px-4 text-left">일간 점수</th>
              <th className="py-3 px-4 text-left">변동</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">1</td>
              <td className="py-3 px-4">일간 인기 제품 1</td>
              <td className="py-3 px-4">소프트웨어</td>
              <td className="py-3 px-4">9.8</td>
              <td className="py-3 px-4 text-green-600">↑ 1</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">2</td>
              <td className="py-3 px-4">일간 인기 제품 2</td>
              <td className="py-3 px-4">하드웨어</td>
              <td className="py-3 px-4">9.5</td>
              <td className="py-3 px-4 text-red-600">↓ 1</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">3</td>
              <td className="py-3 px-4">일간 인기 제품 3</td>
              <td className="py-3 px-4">서비스</td>
              <td className="py-3 px-4">9.2</td>
              <td className="py-3 px-4 text-green-600">↑ 4</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">4</td>
              <td className="py-3 px-4">일간 인기 제품 4</td>
              <td className="py-3 px-4">소프트웨어</td>
              <td className="py-3 px-4">9.0</td>
              <td className="py-3 px-4 text-gray-400">-</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">5</td>
              <td className="py-3 px-4">일간 인기 제품 5</td>
              <td className="py-3 px-4">하드웨어</td>
              <td className="py-3 px-4">8.9</td>
              <td className="py-3 px-4 text-red-600">↓ 2</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">시간대별 인기 제품</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4">시간대별 인기 제품 변화를 확인하세요:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">오전 (00:00 - 06:00)</h3>
              <ol className="list-decimal list-inside">
                <li>오전 인기 제품 1</li>
                <li>오전 인기 제품 2</li>
                <li>오전 인기 제품 3</li>
              </ol>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">오전 (06:00 - 12:00)</h3>
              <ol className="list-decimal list-inside">
                <li>오전 인기 제품 1</li>
                <li>오전 인기 제품 2</li>
                <li>오전 인기 제품 3</li>
              </ol>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">오후 (12:00 - 18:00)</h3>
              <ol className="list-decimal list-inside">
                <li>오후 인기 제품 1</li>
                <li>오후 인기 제품 2</li>
                <li>오후 인기 제품 3</li>
              </ol>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">저녁 (18:00 - 24:00)</h3>
              <ol className="list-decimal list-inside">
                <li>저녁 인기 제품 1</li>
                <li>저녁 인기 제품 2</li>
                <li>저녁 인기 제품 3</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 