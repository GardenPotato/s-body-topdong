import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface TextStyle {
  fontSize: string;
  color: string;
  fontWeight: string;
  textAlign: 'left' | 'center' | 'right';
}

export const defaultTextStyle: TextStyle = {
  fontSize: 'base',
  color: 'inherit',
  fontWeight: 'normal',
  textAlign: 'left',
};

export interface CarouselItem {
  image: string;
  text: string;
  description?: string;
}

export interface UspSection {
  id: string;
  type: 'card' | 'carousel';
  title: string;
  description: string;
  image?: string; // For 'card' type
  items?: CarouselItem[]; // For 'carousel' type
}

// Define the structure of our content
export interface SiteContent {
  theme: {
    primaryColor: string;
    accentColor: string;
    fontFamily: string;
  };
  hero: {
    subCopy: string;
    mainCopy: string;
    brandName: string;
    bgImage: string;
    ctaText: string;
    ctaSubText: string;
    ctaLink: string;
    styles: {
      subCopy: TextStyle;
      mainCopy: TextStyle;
      brandName: TextStyle;
    };
  };
  uspSummary: {
    bgImage: string;
    headCopy?: string;
    bodyCopy?: string;
    items: { icon: string; title: string; description: string }[];
    styles: {
      title: TextStyle;
      description: TextStyle;
      headCopy?: TextStyle;
      bodyCopy?: TextStyle;
    };
  };
  convention: {
    title: string;
    image: string;
    description: string;
    mainCopy: string;
    styles: {
      title: TextStyle;
      description: TextStyle;
      mainCopy: TextStyle;
    };
  };
  disruption: {
    bgImage: string;
    title: string;
    description: string;
    mainCopy: string;
    styles: {
      title: TextStyle;
      description: TextStyle;
      mainCopy: TextStyle;
    };
  };
  detailedUsps: {
    headCopy?: string;
    bodyCopy?: string;
    sections: UspSection[];
    styles: {
      title: TextStyle;
      description: TextStyle;
      headCopy?: TextStyle;
      bodyCopy?: TextStyle;
    };
  };
  outro: {
    ctaText: string;
    mapImage: string;
    mapLink: string;
  };
  footer: {
    brandName: string;
    address: string;
    hours: string;
    phone: string;
    instagram: string;
    blog: string;
  };
  notices: {
    show: boolean;
    title: string;
    description?: string;
    items: { date: string; title: string; description?: string; link?: string }[];
  };
}

// Default Content (Placeholders)
export const defaultContent: SiteContent = {
  theme: {
    primaryColor: '#ffffff',
    accentColor: '#ed7d01',
    fontFamily: 'Pretendard',
  },
  hero: {
    subCopy: '운동에 진심이 되는 공간',
    mainCopy: '에스바디 휘트니스 탑동점',
    brandName: '전문가용 머신 21종・33년 경력 관장 무료 코칭',
    bgImage: 'https://raw.githubusercontent.com/GardenPotato/S-Body_Top/refs/heads/main/hero%201.webp',
    ctaText: '오늘특가! 1만원에 체험하기',
    ctaSubText: '당근 한정 특가!',
    ctaLink: 'https://booking.naver.com/booking/6/bizes/834658',
    styles: {
      subCopy: { ...defaultTextStyle, fontSize: 'sm', color: '#d1d5db', fontWeight: 'bold', textAlign: 'left' },
      mainCopy: { ...defaultTextStyle, fontSize: '3xl', color: '#ffffff', fontWeight: 'extrabold', textAlign: 'left' },
      brandName: { ...defaultTextStyle, fontSize: 'base', color: '#e5e7eb', fontWeight: 'normal', textAlign: 'left' },
    },
  },
  uspSummary: {
    bgImage: 'https://raw.githubusercontent.com/GardenPotato/S-Body_Top/refs/heads/main/blur2.webp',
    headCopy: '보법이 다른 헬스장, 에스바디',
    bodyCopy: "숫자부터 다른 '진짜 운동'을 위한 공간",
    items: [
      { icon: 'Dumbbell', title: '21종', description: '부위별 세분화 21종 머신구성' },
      { icon: 'UserCheck', title: '33년', description: '33년 경력 관장 상시 무료 코칭' },
      { icon: 'MapPin', title: '0원', description: '추가금 없는 전지점 이용' },
    ],
    styles: {
      title: { ...defaultTextStyle, fontSize: 'sm', color: '#111827', fontWeight: 'bold', textAlign: 'center' },
      description: { ...defaultTextStyle, fontSize: 'xs', color: '#6b7280', fontWeight: 'normal', textAlign: 'center' },
      headCopy: { ...defaultTextStyle, fontSize: '2xl', color: '#ed7d01', fontWeight: 'extrabold', textAlign: 'center' },
      bodyCopy: { ...defaultTextStyle, fontSize: 'base', color: '#444444', fontWeight: 'normal', textAlign: 'center' },
    },
  },
  convention: {
    title: '헬스장, 가격만 보면 될까요?',
    image: 'https://raw.githubusercontent.com/GardenPotato/S-Body_Top/refs/heads/main/convention.webp',
    description: "치킨 한번 사먹을 '월 2만원' 가격\n\n싸구려 보급형 머신, 좁은 프리웨이트 존, \n운동기구 자리경쟁, 전문가 코칭 없는 공간\n\n'아파트 헬스장' 수준의 공간에선\n제대로 된 운동을 하기란 쉽지 않습니다\n\n싸다고 좋은 헬스장이 아닙니다\n\"헬스장에도 수준 차이가 있습니다\"",
    mainCopy: '1년을 싸게 다녀도 변화가 없다면\n그건 절약이 아니라 \'낭비\'입니다',
    styles: {
      title: { ...defaultTextStyle, fontSize: '2xl', color: '#ff9300', fontWeight: 'bold', textAlign: 'center' },
      description: { ...defaultTextStyle, fontSize: 'base', color: '#ebebeb', fontWeight: 'normal', textAlign: 'center' },
      mainCopy: { ...defaultTextStyle, fontSize: 'xl', color: '#ffffff', fontWeight: 'extrabold', textAlign: 'center' },
    },
  },
  disruption: {
    bgImage: 'https://raw.githubusercontent.com/GardenPotato/S-Body_Top/refs/heads/main/disruption-bw-v3.webp',
    title: '좋은 헬스장의 조건',
    description: '자극 부위를 세분화하여, 다양한 머신을 갖춘 곳.\n한계까지 밀어 붙일, 성능 좋은 머신을 갖춘 곳.\n전문가가 상주하며, 조작법을 코칭하는 곳.\n\n이런 헬스장에서 운동을 해야만\n시간을 아끼고, 확실한 변화가 가능합니다',
    mainCopy: '결국, 헬스장의 수준은 \n머신의 수준에서 결정납니다',
    styles: {
      title: { ...defaultTextStyle, fontSize: 'lg', color: '#ff9300', fontWeight: 'extrabold', textAlign: 'left' },
      description: { ...defaultTextStyle, fontSize: 'base', color: '#ffffff', fontWeight: 'medium', textAlign: 'left' },
      mainCopy: { ...defaultTextStyle, fontSize: '2xl', color: '#ed7d03', fontWeight: 'extrabold', textAlign: 'left' },
    },
  },
  detailedUsps: {
    headCopy: '타협 없는 자극, 확실한 성장',
    bodyCopy: '분명한 변화는 좋은 머신에서 시작됩니다',
    sections: [
      {
        id: 'usp1',
        type: 'card',
        title: '미스터 올림피아 공식 후원 브랜드\nM-Torture 머신',
        description: '세계적인 보디빌더 대회, \'미스터 올림피아\'\n공식 후원 브랜드! 정상급 보디빌더가 선택한\n최고의 머신으로 운동하세요',
        image: 'https://raw.githubusercontent.com/GardenPotato/S-Body_Top/refs/heads/main/usp%201.webp'
      },
      {
        id: 'usp2',
        type: 'carousel',
        title: '21종 머신 풀세팅',
        description: '등 5종 · 하체 9종 · 가슴 4종 · 어깨 3종!\n빈틈 없는 구성으로, 다양한 부위를 촘촘히 공략',
        items: [
          { text: '등 5종', description: '로우 3종, 와이드 풀다운 2종\n바른 자세부터 뒷태 완성까지!', image: 'https://raw.githubusercontent.com/GardenPotato/S-Body_Top/refs/heads/main/usp%202-1.webp' },
          { text: '하체 9종', description: '스쿼트 2종, 프레스 2종, 레그 4종, 힙 2종\n탄력 하체 라인부터 애플힙까지!', image: 'https://raw.githubusercontent.com/GardenPotato/S-Body_Top/refs/heads/main/usp%202-2.webp' },
          { text: '가슴 (4종)', description: '체스트 프레스 2종, 플라이 1종\n벌크업부터 머슬핏 형성까지!', image: 'https://raw.githubusercontent.com/GardenPotato/S-Body_Top/refs/heads/main/usp%202-3.webp' },
          { text: '어깨 (3종)', description: '레터럴 레이즈 2종, 프레스 1종\n옷빨 치트키, 어깨 깡패 도전!', image: 'https://raw.githubusercontent.com/GardenPotato/S-Body_Top/refs/heads/main/usp%202-4.webp' },
        ]
      },
      {
        id: 'usp3',
        type: 'carousel',
        title: '전문가용 고성능 머신',
        description: '프로들도 사용하는 고성능 M-Torture 머신!\n목표 부위에 확실한 자극을 주어 빠른 변화 체감\n',
        items: [
          { text: '양팔 독립 가동', description: '한쪽 팔만 움직이는 원암 운동으로\n목표 부위를 한계까지 공략', image: 'https://raw.githubusercontent.com/GardenPotato/S-Body_Top/refs/heads/main/usp%203-1.gif' },
          { text: '아크형 궤적 설계', description: '넓은 가동 범위를 전부 커버하여\n타겟 부위에 보다 정확한 자극', image: 'https://raw.githubusercontent.com/GardenPotato/S-Body_Top/refs/heads/main/usp%203-2.gif' },
          { text: '저항 유지', description: '무게가 날라가는 구간 없이\n묵직한 무게감이 일정하게 유지', image: 'https://raw.githubusercontent.com/GardenPotato/S-Body_Top/refs/heads/main/usp%203-3.webp' },
          { text: '맞춤 조정', description: '시트와 패드를 최대 7단계로 조절\n원하는 자극점만 정밀하게 타격', image: 'https://raw.githubusercontent.com/GardenPotato/S-Body_Top/refs/heads/main/usp%203-4.webp' },
        ]
      },
      {
        id: 'usp4',
        type: 'card',
        title: '33년 경력 관장 상주 케어',
        description: '운동법 무료 코칭・첫걸음 PT 무료 제공\n초보자도 걱정 없이 시작하세요!',
        image: 'https://raw.githubusercontent.com/GardenPotato/S-Body_Top/refs/heads/main/usp%204.webp'
      },
      {
        id: 'usp5',
        type: 'card',
        title: '에스바디 전지점 자유 이용',
        description: '탑동점만 등록해도 에스바디의 모든 지점을\n자유롭게 이용할 수 있습니다',
        image: 'https://raw.githubusercontent.com/GardenPotato/S-Body_Top/refs/heads/main/usp%205.webp'
      }
    ],
    styles: {
      title: { ...defaultTextStyle, fontSize: 'xl', color: '#111827', fontWeight: 'bold', textAlign: 'left' },
      description: { ...defaultTextStyle, fontSize: 'base', color: '#4b5563', fontWeight: 'normal', textAlign: 'left' },
      headCopy: { ...defaultTextStyle, fontSize: '2xl', color: '#ed7d06', fontWeight: 'bold', textAlign: 'center' },
      bodyCopy: { ...defaultTextStyle, fontSize: 'base', color: '#4b5563', fontWeight: 'normal', textAlign: 'center' },
    },
  },
  outro: {
    ctaText: '체험 후 등록 시, 1만원 즉시 환급',
    mapImage: 'https://raw.githubusercontent.com/GardenPotato/S-Body_Top/refs/heads/main/outro.webp',
    mapLink: 'https://booking.naver.com/booking/6/bizes/834658',
  },
  footer: {
    brandName: '에스바디 휘트니스 탑동점',
    address: '경기 수원시 권선구 하탑로 52, 대능빌딩 5층',
    hours: '평일 08:00 - 24:00 / 주말 09:00 - 18:00',
    phone: '0507-1304-1016',
    instagram: 'https://www.instagram.com/s_body_top/',
    blog: 'https://blog.naver.com/sexy2011004/224196127891',
  },
  notices: {
    show: false,
    title: '공지사항 & 이벤트',
    description: '에스바디 휘트니스의 새로운 소식을 확인하세요.',
    items: [
      { date: '2024.03.01', title: '3월 봄맞이 PT 할인 이벤트', description: '선착순 10명 한정! 최대 40% 할인 혜택을 놓치지 마세요.', link: '#' },
      { date: '2024.02.28', title: '삼일절 단축 운영 안내', description: '공휴일 운영 시간은 오전 10시부터 오후 6시까지입니다.', link: '#' },
    ],
  },
};

interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => void;
  updateSection: <K extends keyof SiteContent>(section: K, data: SiteContent[K]) => void;
  saveContent: () => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  // Load from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('siteContent_v3');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        
        // Deep merge to ensure new fields (like styles) from defaultContent are preserved
        // if they are missing in the saved content.
        setContent((prev) => {
          const merged = { ...prev };
          (Object.keys(parsed) as Array<keyof SiteContent>).forEach((key) => {
            if (key in merged && typeof merged[key] === 'object' && merged[key] !== null && !Array.isArray(merged[key])) {
              // Merge section objects (hero, convention, etc.)
              merged[key] = {
                ...merged[key],
                ...parsed[key],
                // Special handling for styles to ensure sub-fields are merged if styles exist in both
                styles: {
                  // @ts-ignore
                  ...(merged[key].styles || {}),
                  // @ts-ignore
                  ...(parsed[key].styles || {})
                }
              };
            } else {
              // Primitive values or Arrays (replace entirely)
              merged[key] = parsed[key];
            }
          });
          return merged;
        });
      } catch (e) {
        console.error("Failed to load content", e);
      }
    }
  }, []);

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
  };

  const updateSection = <K extends keyof SiteContent>(section: K, data: SiteContent[K]) => {
    setContent((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const saveContent = () => {
    localStorage.setItem('siteContent_v3', JSON.stringify(content));
    alert('저장되었습니다!');
  };

  const resetContent = () => {
    if (confirm('모든 변경사항을 초기화하시겠습니까?')) {
      localStorage.removeItem('siteContent_v3');
      setContent(defaultContent);
    }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, updateSection, saveContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
