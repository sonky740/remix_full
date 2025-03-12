import { useState } from 'react';

export default function SubmitPage() {
  // 폼 상태
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    website: '',
    logo: null as File | null,
    screenshots: [] as File[],
    pricing: 'free',
    customPricing: '',
    tags: [] as string[]
  });

  // 제출 상태
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // 카테고리 목록
  const categories = [
    { id: 'software', name: '소프트웨어' },
    { id: 'hardware', name: '하드웨어' },
    { id: 'services', name: '서비스' },
    { id: 'mobile', name: '모바일' },
    { id: 'ai', name: '인공지능' },
    { id: 'iot', name: '사물인터넷' },
    { id: 'gaming', name: '게임' },
    { id: 'productivity', name: '생산성' },
    { id: 'education', name: '교육' },
    { id: 'health', name: '건강' },
    { id: 'finance', name: '금융' },
    { id: 'entertainment', name: '엔터테인먼트' }
  ];

  // 가격 옵션
  const pricingOptions = [
    { id: 'free', name: '무료' },
    { id: 'freemium', name: '프리미엄(기본 무료)' },
    { id: 'paid', name: '유료' },
    { id: 'subscription', name: '구독' },
    { id: 'custom', name: '직접 입력' }
  ];

  // 태그 목록
  const availableTags = [
    '웹', '모바일', '데스크톱', '오픈소스', '클라우드', 'SaaS',
    'AI', '머신러닝', '블록체인', 'IoT', '생산성', '협업',
    '커뮤니케이션', '디자인', '개발', '마케팅', '분석', '보안'
  ];

  // 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 로고 업로드 핸들러
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({ ...prev, logo: e.target.files![0] }));
    }
  };

  // 스크린샷 업로드 핸들러
  const handleScreenshotsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newScreenshots = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        screenshots: [...prev.screenshots, ...newScreenshots]
      }));
    }
  };

  // 스크린샷 제거 핸들러
  const handleRemoveScreenshot = (index: number) => {
    setFormData(prev => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index)
    }));
  };

  // 태그 토글 핸들러
  const handleTagToggle = (tag: string) => {
    setFormData(prev => {
      if (prev.tags.includes(tag)) {
        return { ...prev, tags: prev.tags.filter(t => t !== tag) };
      } else {
        return { ...prev, tags: [...prev.tags, tag] };
      }
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (!formData.name) {
      setError('제품 이름은 필수입니다.');
      return;
    }

    if (!formData.description) {
      setError('제품 설명은 필수입니다.');
      return;
    }

    if (!formData.category) {
      setError('카테고리는 필수입니다.');
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
        name: '',
        description: '',
        category: '',
        website: '',
        logo: null,
        screenshots: [],
        pricing: 'free',
        customPricing: '',
        tags: []
      });
    }, 1500);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">제품 등록</h1>
      <p className="text-gray-600 mb-8">새로운 제품을 등록하고 사용자들에게 소개하세요.</p>

      {isSubmitted ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p className="font-bold">제품이 성공적으로 등록되었습니다!</p>
          <p>관리자 검토 후 승인되면 제품 목록에 표시됩니다.</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setIsSubmitted(false)}
          >
            다른 제품 등록하기
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">기본 정보</h2>

            <div className="mb-4">
              <label htmlFor="name" className="block font-medium mb-1">제품 이름 *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block font-medium mb-1">제품 설명 *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-gray-500 text-sm mt-1">제품에 대한 간결하고 명확한 설명을 작성하세요.</p>
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="block font-medium mb-1">카테고리 *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">카테고리 선택</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="website" className="block font-medium mb-1">웹사이트 URL</label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://"
              />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">미디어</h2>

            <div className="mb-4">
              <label htmlFor="logo" className="block font-medium mb-1">로고</label>
              <input
                type="file"
                id="logo"
                name="logo"
                onChange={handleLogoUpload}
                accept="image/*"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-gray-500 text-sm mt-1">권장 크기: 512x512px, 최대 2MB</p>

              {formData.logo && (
                <div className="mt-2 flex items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                    <img
                      src={URL.createObjectURL(formData.logo)}
                      alt="로고 미리보기"
                      className="max-w-full max-h-full"
                    />
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{formData.logo.name}</span>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="screenshots" className="block font-medium mb-1">스크린샷</label>
              <input
                type="file"
                id="screenshots"
                name="screenshots"
                onChange={handleScreenshotsUpload}
                accept="image/*"
                multiple
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-gray-500 text-sm mt-1">최대 5개, 각 파일 최대 5MB</p>

              {formData.screenshots.length > 0 && (
                <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {formData.screenshots.map((screenshot, index) => (
                    <div key={index} className="relative">
                      <div className="w-full h-24 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                        <img
                          src={URL.createObjectURL(screenshot)}
                          alt={`스크린샷 ${index + 1}`}
                          className="max-w-full max-h-full"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveScreenshot(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">가격 및 태그</h2>

            <div className="mb-4">
              <label className="block font-medium mb-1">가격 정책</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pricingOptions.map(option => (
                  <div key={option.id} className="flex items-center">
                    <input
                      type="radio"
                      id={`pricing-${option.id}`}
                      name="pricing"
                      value={option.id}
                      checked={formData.pricing === option.id}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor={`pricing-${option.id}`}>{option.name}</label>
                  </div>
                ))}
              </div>

              {formData.pricing === 'custom' && (
                <div className="mt-2">
                  <input
                    type="text"
                    name="customPricing"
                    value={formData.customPricing}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="가격 정책을 입력하세요"
                  />
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">태그</label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 rounded text-sm ${formData.tags.includes(tag)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <p className="text-gray-500 text-sm mt-1">제품과 관련된 태그를 선택하세요 (최대 5개)</p>
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
              {isSubmitting ? '제출 중...' : '제품 등록하기'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 