import { useEffect, useState } from 'react';

export default function UseFilteredData({
  baseUrl,
  filters = {},               
  isImmediate = true,         
}) {
  const [data, setData] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 530);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 530);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const buildUrlWithParams = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value?.trim?.() || typeof value === 'string') params.append(key, value.trim());
      else if (value) params.append(key, value);
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const fetchData = async (url, append = false) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      if (result.error) throw new Error(result.error);

      setData(prev => append ? [...prev, ...result.results] : result.results);
      setNextPageUrl(result.info?.next || null);
    } catch (err) {
      console.error('Ошибка загрузки:', err.message);
      setData([]);
      setNextPageUrl(null);
    }
  };

  useEffect(() => {
    if (isImmediate && isDesktop) {
      const timeout = setTimeout(() => {
        fetchData(buildUrlWithParams());
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [JSON.stringify(filters), isDesktop, isImmediate]);

  const applyFilters = () => {
    fetchData(buildUrlWithParams());
    setShowMobileFilters(false);
  };

  return {
    data,
    nextPageUrl,
    fetchMore: () => fetchData(nextPageUrl, true),
    applyFilters,
    setShowMobileFilters,
    showMobileFilters,
    isDesktop,
  };
}
