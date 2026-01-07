
export interface PromptConfig {
  idea: string;
  style: string;
  lighting: string;
  camera: string;
  mood: string;
  artist: string;
  aspectRatio: string;
}

export interface GeneratedPrompt {
  english: string;
  arabicDescription: string;
  tags: string[];
}

export enum Style {
  REALISTIC = 'واقعي - Photorealistic',
  ANIME = 'أنمي - Anime/Manga',
  DIGITAL_ART = 'رسم رقمي - Digital Art',
  CYBERPUNK = 'سايبربانك - Cyberpunk',
  OIL_PAINTING = 'رسم زيتي - Oil Painting',
  VINTAGE = 'قديم - Vintage Photography',
  CONCEPT_ART = 'فن مفاهيمي - Concept Art',
  MINIMALIST = 'تبسيطي - Minimalist'
}

export enum Lighting {
  GOLDEN_HOUR = 'الساعة الذهبية - Golden Hour',
  CINEMATIC = 'سينمائي - Cinematic',
  NEON = 'نيون - Neon Lights',
  SOFT = 'ناعم - Soft Studio',
  DRAMATIC = 'درامي - Dramatic Shadows',
  VOLUMETRIC = 'إضاءة حجمية - Volumetric Light'
}

export enum Camera {
  MACRO = 'ماكرو - Macro Lens',
  WIDE_ANGLE = 'زاوية واسعة - Wide Angle',
  TELEPHOTO = 'تليفوتوغرافي - Telephoto',
  DRONE = 'درون - Drone View',
  EYE_LEVEL = 'مستوى العين - Eye Level'
}
