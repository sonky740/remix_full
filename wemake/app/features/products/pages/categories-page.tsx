export default function CategoriesPage() {
  // 카테고리 목록 (예시)
  const categories = [
    { id: 'software', name: '소프트웨어', count: 120, icon: '💻' },
    { id: 'hardware', name: '하드웨어', count: 85, icon: '🖥️' },
    { id: 'services', name: '서비스', count: 95, icon: '🔧' },
    { id: 'mobile', name: '모바일', count: 110, icon: '📱' },
    { id: 'ai', name: '인공지능', count: 75, icon: '🤖' },
    { id: 'iot', name: '사물인터넷', count: 60, icon: '🌐' },
    { id: 'gaming', name: '게임', count: 90, icon: '🎮' },
    { id: 'productivity', name: '생산성', count: 70, icon: '📊' },
    { id: 'education', name: '교육', count: 65, icon: '📚' },
    { id: 'health', name: '건강', count: 55, icon: '🏥' },
    { id: 'finance', name: '금융', count: 50, icon: '💰' },
    { id: 'entertainment', name: '엔터테인먼트', count: 80, icon: '🎬' }
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">제품 카테고리</h1>
      <p className="mb-6">다양한 카테고리별로 제품을 찾아보세요.</p>

      <div className="flex gap-4 mb-8">
        <a href="/products" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
          모든 제품
        </a>
        <a href="/products/leaderboards" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          리더보드
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <a
            key={category.id}
            href={`/products/categories/${category.id}`}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-4">{category.icon}</span>
              <div>
                <h2 className="text-xl font-semibold">{category.name}</h2>
                <p className="text-gray-600">{category.count}개의 제품</p>
              </div>
            </div>
            <p className="text-gray-700">
              {category.name} 카테고리의 모든 제품을 확인하세요.
            </p>
            <div className="mt-4 text-blue-600 hover:underline">
              카테고리 보기 &rarr;
            </div>
          </a>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">인기 카테고리</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">🔥</span>
                <h3 className="font-semibold">급상승 카테고리</h3>
              </div>
              <ol className="list-decimal list-inside">
                <li>인공지능</li>
                <li>사물인터넷</li>
                <li>모바일</li>
              </ol>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">⭐</span>
                <h3 className="font-semibold">최다 제품 카테고리</h3>
              </div>
              <ol className="list-decimal list-inside">
                <li>소프트웨어</li>
                <li>모바일</li>
                <li>서비스</li>
              </ol>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">👑</span>
                <h3 className="font-semibold">최고 평점 카테고리</h3>
              </div>
              <ol className="list-decimal list-inside">
                <li>인공지능</li>
                <li>게임</li>
                <li>생산성</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 