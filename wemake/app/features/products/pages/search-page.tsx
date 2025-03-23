import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  // 검색 결과 상태 (예시)
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 카테고리 필터 옵션
  const categories = [
    { id: 'all', name: '전체' },
    { id: 'software', name: '소프트웨어' },
    { id: 'hardware', name: '하드웨어' },
    { id: 'services', name: '서비스' },
    { id: 'mobile', name: '모바일' },
    { id: 'ai', name: '인공지능' },
    { id: 'iot', name: '사물인터넷' },
  ];

  // 정렬 옵션
  const sortOptions = [
    { value: 'relevance', label: '관련성' },
    { value: 'newest', label: '최신순' },
    { value: 'popular', label: '인기순' },
    { value: 'rating', label: '평점순' },
  ];

  // 검색 핸들러
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchInput = (document.getElementById('search-input') as HTMLInputElement).value;
    setSearchParams({ q: searchInput });

    // 검색 로직 (예시)
    setLoading(true);
    setTimeout(() => {
      // 가상의 검색 결과 생성
      const mockResults = Array.from({ length: 10 }, (_, i) => ({
        id: `result-${i + 1}`,
        name: `검색 결과 제품 ${i + 1}`,
        description: `"${searchInput}" 검색어와 관련된 제품 ${i + 1}에 대한 설명입니다.`,
        category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1].name,
        rating: (3.5 + Math.random() * 1.5).toFixed(1),
        reviews: Math.floor(Math.random() * 500) + 10,
        date: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
          .toISOString()
          .split('T')[0],
      }));

      setResults(mockResults);
      setLoading(false);
    }, 500);
  };

  // 컴포넌트 마운트 시 검색어가 있으면 검색 실행
  useEffect(() => {
    if (query) {
      setLoading(true);
      setTimeout(() => {
        // 가상의 검색 결과 생성
        const mockResults = Array.from({ length: 10 }, (_, i) => ({
          id: `result-${i + 1}`,
          name: `검색 결과 제품 ${i + 1}`,
          description: `"${query}" 검색어와 관련된 제품 ${i + 1}에 대한 설명입니다.`,
          category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1].name,
          rating: (3.5 + Math.random() * 1.5).toFixed(1),
          reviews: Math.floor(Math.random() * 500) + 10,
          date: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
            .toISOString()
            .split('T')[0],
        }));

        setResults(mockResults);
        setLoading(false);
      }, 500);
    }
  }, [query]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">제품 검색</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex">
          <input
            id="search-input"
            type="text"
            placeholder="검색어를 입력하세요"
            className="flex-grow px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={query}
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700"
          >
            검색
          </button>
        </div>
      </form>

      {query && (
        <div className="mb-6">
          <p className="text-gray-600">
            <span className="font-semibold">"{query}"</span>에 대한 검색 결과 {results.length}개
          </p>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* 필터 사이드바 */}
        <div className="w-full md:w-64 bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-lg font-semibold mb-4">필터</h2>

          <div className="mb-6">
            <h3 className="font-medium mb-2">카테고리</h3>
            {categories.map(category => (
              <div key={category.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  className="mr-2"
                  defaultChecked={category.id === 'all'}
                />
                <label htmlFor={`category-${category.id}`}>{category.name}</label>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">평점</h3>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="rating-4" className="mr-2" />
              <label htmlFor="rating-4">4점 이상</label>
            </div>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="rating-3" className="mr-2" />
              <label htmlFor="rating-3">3점 이상</label>
            </div>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="rating-2" className="mr-2" />
              <label htmlFor="rating-2">2점 이상</label>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">출시일</h3>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="date-month" className="mr-2" />
              <label htmlFor="date-month">최근 1개월</label>
            </div>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="date-quarter" className="mr-2" />
              <label htmlFor="date-quarter">최근 3개월</label>
            </div>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="date-year" className="mr-2" />
              <label htmlFor="date-year">최근 1년</label>
            </div>
          </div>
        </div>

        {/* 검색 결과 */}
        <div className="flex-grow">
          {/* 정렬 옵션 */}
          <div className="flex justify-end mb-4">
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2">
                정렬:
              </label>
              <select id="sort" className="px-3 py-2 border rounded">
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 로딩 상태 */}
          {loading && (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-600">검색 중...</p>
            </div>
          )}

          {/* 검색 결과 없음 */}
          {!loading && query && results.length === 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-600">검색 결과가 없습니다.</p>
              <p className="mt-2">다른 검색어로 시도해보세요.</p>
            </div>
          )}

          {/* 검색 결과 목록 */}
          {!loading && results.length > 0 && (
            <div className="space-y-4">
              {results.map(result => (
                <div key={result.id} className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-2">{result.name}</h2>
                  <p className="text-gray-600 mb-4">{result.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm mr-2">
                        {result.category}
                      </span>
                      <span className="text-gray-500 text-sm">{result.date}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>{result.rating}</span>
                      <span className="text-gray-400 ml-2">({result.reviews} 리뷰)</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200">
                    자세히 보기
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 페이지네이션 */}
          {!loading && results.length > 0 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center">
                <a href="#" className="px-3 py-1 border rounded-l hover:bg-gray-100">
                  이전
                </a>
                {[1, 2, 3, 4, 5].map(page => (
                  <a
                    key={page}
                    href="#"
                    className={`px-3 py-1 border-t border-b ${
                      page === 1 ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </a>
                ))}
                <a href="#" className="px-3 py-1 border rounded-r hover:bg-gray-100">
                  다음
                </a>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
