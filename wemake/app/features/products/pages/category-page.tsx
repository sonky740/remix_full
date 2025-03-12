import { useParams } from 'react-router-dom';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();

  // 카테고리 정보 (예시)
  const categoryInfo = {
    software: { name: '소프트웨어', icon: '💻', description: '다양한 소프트웨어 제품들을 확인하세요.' },
    hardware: { name: '하드웨어', icon: '🖥️', description: '최신 하드웨어 제품들을 확인하세요.' },
    services: { name: '서비스', icon: '🔧', description: '유용한 서비스 제품들을 확인하세요.' },
    mobile: { name: '모바일', icon: '📱', description: '모바일 관련 제품들을 확인하세요.' },
    ai: { name: '인공지능', icon: '🤖', description: '혁신적인 인공지능 제품들을 확인하세요.' },
    iot: { name: '사물인터넷', icon: '🌐', description: '연결된 사물인터넷 제품들을 확인하세요.' },
    gaming: { name: '게임', icon: '🎮', description: '재미있는 게임 제품들을 확인하세요.' },
    productivity: { name: '생산성', icon: '📊', description: '효율적인 생산성 제품들을 확인하세요.' },
    education: { name: '교육', icon: '📚', description: '유익한 교육 제품들을 확인하세요.' },
    health: { name: '건강', icon: '🏥', description: '건강 관련 제품들을 확인하세요.' },
    finance: { name: '금융', icon: '💰', description: '금융 관련 제품들을 확인하세요.' },
    entertainment: { name: '엔터테인먼트', icon: '🎬', description: '즐거운 엔터테인먼트 제품들을 확인하세요.' }
  };

  // 현재 카테고리 정보 가져오기
  const currentCategory = categoryInfo[category as keyof typeof categoryInfo] || {
    name: '알 수 없는 카테고리',
    icon: '❓',
    description: '카테고리 정보를 찾을 수 없습니다.'
  };

  // 제품 목록 (예시)
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: `product-${i + 1}`,
    name: `${currentCategory.name} 제품 ${i + 1}`,
    description: `${currentCategory.name} 카테고리의 제품 ${i + 1}에 대한 설명입니다.`,
    rating: (4 + Math.random()).toFixed(1),
    reviews: Math.floor(Math.random() * 500) + 10,
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0]
  }));

  // 정렬 옵션
  const sortOptions = [
    { value: 'newest', label: '최신순' },
    { value: 'popular', label: '인기순' },
    { value: 'rating', label: '평점순' },
    { value: 'reviews', label: '리뷰순' }
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <span className="text-5xl mr-4">{currentCategory.icon}</span>
        <div>
          <h1 className="text-3xl font-bold">{currentCategory.name} 카테고리</h1>
          <p className="text-gray-600">{currentCategory.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <a href="/products/categories" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
          모든 카테고리
        </a>
        <a href="/products" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          모든 제품
        </a>
      </div>

      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">{products.length}개의 제품</p>
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2">정렬:</label>
          <select id="sort" className="px-3 py-2 border rounded">
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span>{product.rating}</span>
                <span className="text-gray-400 ml-2">({product.reviews} 리뷰)</span>
              </div>
              <span className="text-gray-500 text-sm">{product.date}</span>
            </div>
            <button className="w-full mt-2 px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200">
              자세히 보기
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <nav className="flex items-center">
          <a href="#" className="px-3 py-1 border rounded-l hover:bg-gray-100">이전</a>
          {[1, 2, 3, 4, 5].map(page => (
            <a
              key={page}
              href="#"
              className={`px-3 py-1 border-t border-b ${page === 1 ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              {page}
            </a>
          ))}
          <a href="#" className="px-3 py-1 border rounded-r hover:bg-gray-100">다음</a>
        </nav>
      </div>
    </div>
  );
} 