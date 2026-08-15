import type {
  Location,
  CreateLocationRequest,
  UpdateLocationRequest,
} from "../types/location";

let locations: Location[] = [
  {
    id: 1,
    name: "Cửa hàng Hà Nội",
    address: "123 Đường Cầu Giấy",
    city: "Hà Nội",
    phone: "0123456789",
  },
  {
    id: 2,
    name: "Cửa hàng TP. Hồ Chí Minh",
    address: "456 Nguyễn Trãi",
    city: "TP. Hồ Chí Minh",
    phone: "0987654321",
  },
];

export const locationService = {
  async getLocations(): Promise<Location[]> {
    return [...locations];
  },

  async getLocationById(
    id: number
  ): Promise<Location> {
    const location =
      locations.find(
        (item) => item.id === id
      );

    if (!location) {
      throw new Error(
        "Không tìm thấy địa điểm."
      );
    }

    return location;
  },

  async createLocation(
    data: CreateLocationRequest
  ): Promise<Location> {
    const newLocation: Location = {
      id:
        locations.length > 0
          ? Math.max(
              ...locations.map(
                (item) => item.id
              )
            ) + 1
          : 1,
      ...data,
    };

    locations.push(newLocation);

    return newLocation;
  },

  async updateLocation(
    id: number,
    data: UpdateLocationRequest
  ): Promise<Location> {
    const index =
      locations.findIndex(
        (item) => item.id === id
      );

    if (index === -1) {
      throw new Error(
        "Không tìm thấy địa điểm."
      );
    }

    locations[index] = {
      ...locations[index],
      ...data,
    };

    return locations[index];
  },

  async deleteLocation(
    id: number
  ): Promise<boolean> {
    const index =
      locations.findIndex(
        (item) => item.id === id
      );

    if (index === -1) {
      return false;
    }

    locations.splice(index, 1);

    return true;
  },
};