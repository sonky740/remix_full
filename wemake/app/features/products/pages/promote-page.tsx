import { useState } from 'react';

export default function PromotePage() {
  // 폼 상태
  const [formData, setFormData] = useState({
    productName: '',
    productId: '',
    promotionType: '',
    startDate: '',
    endDate: '',
    budget: '',
    targetAudience: [] as string[],
    message: ''
  });

  // 제출 상태
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // 홍보 유형 옵션
  const promotionTypes = [
    { id: 'featured', name: '추천 제품', description: '메인 페이지에 제품을 추천 제품으로 표시합니다.', price: '100,000원/주' },
    { id: 'spotlight', name: '스포트라이트', description: '카테고리 페이지 상단에 제품을 강조 표시합니다.', price: '50,000원/주' },
    { id: 'newsletter', name: '뉴스레터', description: '주간 뉴스레터에 제품을 소개합니다.', price: '30,000원/회' },
    { id: 'banner', name: '배너 광고', description: '사이트 전체에 배너 광고를 게재합니다.', price: '200,000원/주' }
  ];

  // 대상 사용자 옵션
  const audienceOptions = [
    { id: 'developers', name: '개발자' },
    { id: 'designers', name: '디자이너' },
    { id: 'marketers', name: '마케터' },
    { id: 'entrepreneurs', name: '창업자' },
    { id: 'students', name: '학생' },
    { id: 'professionals', name: '전문가' }
  ];

  // 제품 목록 (예시)
  const products = [
    { id: 'product-1', name: '제품 1' },
    { id: 'product-2', name: '제품 2' },
    { id: 'product-3', name: '제품 3' }
  ];

  // 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 제품 선택 핸들러
  const handleProductSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProduct = products.find(p => p.id === e.target.value);
    if (selectedProduct) {
      setFormData(prev => ({
        ...prev,
        productId: selectedProduct.id,
        productName: selectedProduct.name
      }));
    }
  };

  // 대상 사용자 토글 핸들러
  const handleAudienceToggle = (audienceId: string) => {
    setFormData(prev => {
      if (prev.targetAudience.includes(audienceId)) {
        return { ...prev, targetAudience: prev.targetAudience.filter(id => id !== audienceId) };
      } else {
        return { ...prev, targetAudience: [...prev.targetAudience, audienceId] };
      }
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (!formData.productId) {
      setError('제품을 선택해주세요.');
      return;
    }

    if (!formData.promotionType) {
      setError('홍보 유형을 선택해주세요.');
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      setError('홍보 기간을 설정해주세요.');
      return;
    }

    if (!formData.budget) {
      setError('예산을 입력해주세요.');
      return;
    }

    // 제출 로직 (예시)
    setIsSubmitting(true);
    setError('');

    // 가상의 API 호출
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // 폼 초기화
      setFormData({
        productName: '',
        productId: '',
        promotionType: '',
        startDate: '',
        endDate: '',
        budget: '',
        targetAudience: [],
        message: ''
      });
    }, 1500);
  };

  // 가격 계산 (예시)
  const calculatePrice = () => {
    if (!formData.promotionType || !formData.startDate || !formData.endDate) {
      return '0원';
    }

    const promotionType = promotionTypes.find(p => p.id === formData.promotionType);
    if (!promotionType) return '0원';

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const weeks = Math.ceil(days / 7);

    let price = 0;
    if (promotionType.id === 'featured') {
      price = 100000 * weeks;
    } else if (promotionType.id === 'spotlight') {
      price = 50000 * weeks;
    } else if (promotionType.id === 'newsletter') {
      price = 30000;
    } else if (promotionType.id === 'banner') {
      price = 200000 * weeks;
    }

    return price.toLocaleString() + '원';
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">제품 홍보</h1>
      <p className="text-gray-600 mb-8">제품을 효과적으로 홍보하고 더 많은 사용자에게 노출시키세요.</p>

      {isSubmitted ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p className="font-bold">홍보 요청이 성공적으로 제출되었습니다!</p>
          <p>담당자가 검토 후 연락드리겠습니다.</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setIsSubmitted(false)}
          >
            다른 홍보 요청하기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">제품 정보</h2>

                <div className="mb-4">
                  <label htmlFor="productId" className="block font-medium mb-1">홍보할 제품 *</label>
                  <select
                    id="productId"
                    name="productId"
                    value={formData.productId}
                    onChange={handleProductSelect}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">제품 선택</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                  </select>
                  <p className="text-gray-500 text-sm mt-1">
                    <a href="/products/submit" className="text-blue-600 hover:underline">
                      새 제품 등록하기
                    </a>
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">홍보 설정</h2>

                <div className="mb-4">
                  <label className="block font-medium mb-1">홍보 유형 *</label>
                  <div className="grid grid-cols-1 gap-4">
                    {promotionTypes.map(type => (
                      <div key={type.id} className="border rounded p-4 hover:border-blue-500 cursor-pointer">
                        <div className="flex items-start">
                          <input
                            type="radio"
                            id={`promotion-${type.id}`}
                            name="promotionType"
                            value={type.id}
                            checked={formData.promotionType === type.id}
                            onChange={handleInputChange}
                            className="mt-1 mr-3"
                          />
                          <div>
                            <label htmlFor={`promotion-${type.id}`} className="font-medium">
                              {type.name}
                            </label>
                            <p className="text-gray-600 text-sm">{type.description}</p>
                            <p className="text-blue-600 text-sm font-medium mt-1">{type.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block font-medium mb-1">시작일 *</label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="endDate" className="block font-medium mb-1">종료일 *</label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="budget" className="block font-medium mb-1">예산 *</label>
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="예: 500,000원"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-1">대상 사용자</label>
                  <div className="flex flex-wrap gap-2">
                    {audienceOptions.map(audience => (
                      <button
                        key={audience.id}
                        type="button"
                        onClick={() => handleAudienceToggle(audience.id)}
                        className={`px-3 py-1 rounded text-sm ${formData.targetAudience.includes(audience.id)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                          }`}
                      >
                        {audience.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="block font-medium mb-1">추가 메시지</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="홍보에 대한 추가 요청사항이 있으면 작성해주세요."
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 border rounded mr-2 hover:bg-gray-100"
                  onClick={() => window.history.back()}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '제출 중...' : '홍보 요청하기'}
                </button>
              </div>
            </form>
          </div>

          <div>
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
              <h2 className="text-xl font-semibold mb-4">홍보 요약</h2>

              {formData.productName && (
                <div className="mb-4">
                  <h3 className="font-medium text-gray-600">제품</h3>
                  <p>{formData.productName}</p>
                </div>
              )}

              {formData.promotionType && (
                <div className="mb-4">
                  <h3 className="font-medium text-gray-600">홍보 유형</h3>
                  <p>{promotionTypes.find(p => p.id === formData.promotionType)?.name}</p>
                </div>
              )}

              {formData.startDate && formData.endDate && (
                <div className="mb-4">
                  <h3 className="font-medium text-gray-600">홍보 기간</h3>
                  <p>{formData.startDate} ~ {formData.endDate}</p>
                </div>
              )}

              {formData.targetAudience.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium text-gray-600">대상 사용자</h3>
                  <p>
                    {formData.targetAudience
                      .map(id => audienceOptions.find(a => a.id === id)?.name)
                      .join(', ')}
                  </p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center font-bold">
                  <span>예상 비용</span>
                  <span className="text-xl text-blue-600">{calculatePrice()}</span>
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  최종 비용은 담당자 검토 후 확정됩니다.
                </p>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2">도움이 필요하신가요?</h3>
                <p className="text-gray-600 text-sm">
                  홍보 관련 문의사항은 <a href="mailto:promo@example.com" className="text-blue-600 hover:underline">promo@example.com</a>으로 연락주세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 