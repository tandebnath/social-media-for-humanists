/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Brisbane'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    users: User;
    media: Media;
    'page-settings': PageSetting;
    about: About;
    contact: Contact;
    blog: Blog;
    home: Home;
    tutorials: Tutorial;
    'tutorials-overview': TutorialsOverview;
    'website-settings': WebsiteSetting;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    'page-settings': PageSettingsSelect<false> | PageSettingsSelect<true>;
    about: AboutSelect<false> | AboutSelect<true>;
    contact: ContactSelect<false> | ContactSelect<true>;
    blog: BlogSelect<false> | BlogSelect<true>;
    home: HomeSelect<false> | HomeSelect<true>;
    tutorials: TutorialsSelect<false> | TutorialsSelect<true>;
    'tutorials-overview': TutorialsOverviewSelect<false> | TutorialsOverviewSelect<true>;
    'website-settings': WebsiteSettingsSelect<false> | WebsiteSettingsSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {};
  globalsSelect: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  /**
   * Alternative text for accessibility.
   */
  alt?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    medium?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "page-settings".
 */
export interface PageSetting {
  id: number;
  /**
   * Select the page this title belongs to.
   */
  page: 'home' | 'about' | 'contact' | 'tutorialOverview' | 'listOfTutorials' | 'blog';
  /**
   * Title of the page.
   */
  title: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "about".
 */
export interface About {
  id: number;
  /**
   * Full content for the About page.
   */
  content: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contact".
 */
export interface Contact {
  id: number;
  displayTitle?: string | null;
  /**
   * Select whether this entry is a text block or a contact.
   */
  type: 'text-block' | 'contact';
  /**
   * Determines the display order. Lower numbers appear first.
   */
  sortOrder: number;
  /**
   * Main text block for the Contact page.
   */
  body?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  contact?: {
    name: string;
    position: string;
    institution?: string | null;
    email: string;
    /**
     * Upload an image for the contact person.
     */
    image: number | Media;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "blog".
 */
export interface Blog {
  id: number;
  /**
   * The title of the blog post.
   */
  title: string;
  /**
   * Author of the blog post.
   */
  author: string;
  /**
   * Date the blog post was published.
   */
  datePosted: string;
  /**
   * A brief summary of the blog post.
   */
  shortDescription: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  /**
   * The full content of the blog post.
   */
  longDescription: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  /**
   * SEO-friendly slug for the blog post URL.
   */
  slug: string;
  /**
   * Keywords for search optimization and categorization.
   */
  keywords: {
    keyword: string;
    id?: string | null;
  }[];
  /**
   * Estimated reading time in minutes.
   */
  readTime: number;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "home".
 */
export interface Home {
  id: number;
  content: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  /**
   * Set the number of latest updates to display on the homepage.
   */
  maxUpdates: number;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tutorials".
 */
export interface Tutorial {
  id: number;
  /**
   * Controls the display order of tutorial series. Lower appears first.
   */
  sortOrder: number;
  seriesName: string;
  /**
   * Used for routing or SEO (e.g., "/tutorials/[seriesSlug]")
   */
  seriesSlug: string;
  tutorials: {
    /**
     * Controls the order of tutorials in this series.
     */
    sortOrder: number;
    title: string;
    /**
     * Used for routing (e.g., "/tutorials/[seriesSlug]/[slug]")
     */
    slug: string;
    description: string;
    /**
     * Select how this tutorial content will be shown.
     */
    contentType: 'text' | 'link';
    /**
     * Use for text-based tutorials.
     */
    content?: {
      root: {
        type: string;
        children: {
          type: string;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ('ltr' | 'rtl') | null;
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    } | null;
    /**
     * Provide an external link (e.g., Colab).
     */
    linkContent?: string | null;
    id?: string | null;
  }[];
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tutorials-overview".
 */
export interface TutorialsOverview {
  id: number;
  /**
   * Introductory content for the Tutorials section.
   */
  content: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * Configure your website settings here!
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "website-settings".
 */
export interface WebsiteSetting {
  id: number;
  siteName: string;
  logo?: (number | null) | Media;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'page-settings';
        value: number | PageSetting;
      } | null)
    | ({
        relationTo: 'about';
        value: number | About;
      } | null)
    | ({
        relationTo: 'contact';
        value: number | Contact;
      } | null)
    | ({
        relationTo: 'blog';
        value: number | Blog;
      } | null)
    | ({
        relationTo: 'home';
        value: number | Home;
      } | null)
    | ({
        relationTo: 'tutorials';
        value: number | Tutorial;
      } | null)
    | ({
        relationTo: 'tutorials-overview';
        value: number | TutorialsOverview;
      } | null)
    | ({
        relationTo: 'website-settings';
        value: number | WebsiteSetting;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  name?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
  sizes?:
    | T
    | {
        thumbnail?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        medium?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "page-settings_select".
 */
export interface PageSettingsSelect<T extends boolean = true> {
  page?: T;
  title?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "about_select".
 */
export interface AboutSelect<T extends boolean = true> {
  content?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contact_select".
 */
export interface ContactSelect<T extends boolean = true> {
  displayTitle?: T;
  type?: T;
  sortOrder?: T;
  body?: T;
  contact?:
    | T
    | {
        name?: T;
        position?: T;
        institution?: T;
        email?: T;
        image?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "blog_select".
 */
export interface BlogSelect<T extends boolean = true> {
  title?: T;
  author?: T;
  datePosted?: T;
  shortDescription?: T;
  longDescription?: T;
  slug?: T;
  keywords?:
    | T
    | {
        keyword?: T;
        id?: T;
      };
  readTime?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "home_select".
 */
export interface HomeSelect<T extends boolean = true> {
  content?: T;
  maxUpdates?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tutorials_select".
 */
export interface TutorialsSelect<T extends boolean = true> {
  sortOrder?: T;
  seriesName?: T;
  seriesSlug?: T;
  tutorials?:
    | T
    | {
        sortOrder?: T;
        title?: T;
        slug?: T;
        description?: T;
        contentType?: T;
        content?: T;
        linkContent?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tutorials-overview_select".
 */
export interface TutorialsOverviewSelect<T extends boolean = true> {
  content?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "website-settings_select".
 */
export interface WebsiteSettingsSelect<T extends boolean = true> {
  siteName?: T;
  logo?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}