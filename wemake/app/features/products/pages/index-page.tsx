export default function ProductsIndexPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">제품 목록</h1>
      <p className="mb-6">모든 제품들을 확인해보세요.</p>

      <div className="flex gap-4 mb-8">
        <a href="/products/leaderboards" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          리더보드
        </a>
        <a href="/products/categories" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          카테고리
        </a>
        <a href="/products/search" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          검색
        </a>
        <a href="/products/submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          제품 등록
        </a>
        <a href="/products/promote" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
          제품 홍보
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 여기에 제품 목록이 표시됩니다 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">제품 1</h2>
          <p className="text-gray-600 mb-4">제품 1에 대한 간단한 설명입니다.</p>
          <div className="flex justify-between items-center">
            <span className="text-blue-600 font-medium">카테고리: 소프트웨어</span>
            <button className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">자세히 보기</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">제품 2</h2>
          <p className="text-gray-600 mb-4">제품 2에 대한 간단한 설명입니다.</p>
          <div className="flex justify-between items-center">
            <span className="text-blue-600 font-medium">카테고리: 하드웨어</span>
            <button className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">자세히 보기</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">제품 3</h2>
          <p className="text-gray-600 mb-4">제품 3에 대한 간단한 설명입니다.</p>
          <div className="flex justify-between items-center">
            <span className="text-blue-600 font-medium">카테고리: 서비스</span>
            <button className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">자세히 보기</button>
          </div>
        </div>
      </div>
    </div>
  );
} 