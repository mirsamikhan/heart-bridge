/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: educationalresources
 * Interface for EducationalResources
 */
export interface EducationalResources {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  resourceTitle?: string;
  /** @wixFieldType text */
  topicCategory?: string;
  /** @wixFieldType text */
  contentSummary?: string;
  /** @wixFieldType text */
  fullArticleContent?: string;
  /** @wixFieldType url */
  downloadableFileUrl?: string;
}


/**
 * Collection ID: healthsites
 * Interface for HealthSites
 */
export interface HealthSites {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  locationName?: string;
  /** @wixFieldType text */
  address?: string;
  /** @wixFieldType text */
  operatingHours?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType url */
  mapLink?: string;
  /** @wixFieldType boolean */
  isActive?: boolean;
}


/**
 * Collection ID: volunteerpositions
 * Interface for VolunteerPositions
 */
export interface VolunteerPositions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  positionTitle?: string;
  /** @wixFieldType text */
  roleDescription?: string;
  /** @wixFieldType text */
  responsibilities?: string;
  /** @wixFieldType text */
  requirements?: string;
  /** @wixFieldType text */
  locationType?: string;
  /** @wixFieldType boolean */
  trainingProvided?: boolean;
  /** @wixFieldType boolean */
  serviceHoursEligibility?: boolean;
}
