import { SearchRequestParams } from './search-request-params';

export interface ConfigColumn {
    header: string;
    sortBy: string;
    property?: string;
    format?: string;
    headerClass?: string;
    class?: string;
    multiProperty?: string;
    responsive?: string;
    link?: string;
}

export interface ConfigSearch {
    placeholder: string;
    property: string;
    min_chars: number;
}

export interface ConfigSelect {
    label: string;
    options: any[];
    name_property: string;
    value_property: string;
    property_match: string;
}

export interface ConfigDateRange {
    label?: string;
    startDate?: Date;
    endDate?: Date;
    ranges?: any;
}

export interface ConfigAction {
    label: string;
    icon: string;
    class: string;
    click: string;
    authLevels: string[];
}

export interface ResponsiveTableConfig {
    authLevelProperty: string;
    api_url: string;
    search_request_params: SearchRequestParams;
    search: ConfigSearch;
    dateRange: ConfigDateRange;
    selects: ConfigSelect[];
    actions: {
        add: ConfigAction,
        edit: ConfigAction,
        remove: ConfigAction,
        custom: ConfigAction[]
    },
    hideControlsBar: boolean;
    page_size: number;
    columns: ConfigColumn[];
}
