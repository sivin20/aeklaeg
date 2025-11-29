export interface BillettoGalleryItem {
  data: {
    original_url: string;
  }[];
}

export interface BillettoEditorial {
  host: string;
  category: string;
  type: string;
  subcategory: string;
  tags: string[];
  description: string;
  manage_url: string;
  description_html: string;
}

export interface BillettoEvent {
  id: string;
  object: string; // always "event"
  name: string;
  currency: string;
  public: boolean;
  host?: string;
  category?: string;
  subcategory?: string;
  type?: string;
  tags?: string[];
  manage_url?: string;
  online_event?: boolean;
  editorial?: BillettoEditorial;
  parent?: string;
  public_url: string;
  starts_at: string;
  ends_at?: string;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  gallery_items?: BillettoGalleryItem;
  max_capacity?: number;
  venue?: string;
  location?: string;
  organization?: string;
}
