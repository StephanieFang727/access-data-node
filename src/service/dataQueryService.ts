import { DataQueryRepository } from "../repository/dataQueryRepo";
import { DBMAP } from "../utils/constant";

const dataQueryRepository = new DataQueryRepository();

// export class UserService {
//   async getAllUsers() {
//     return userRepository.getAllUsers();
//   }

//   async getUserById(id: number) {
//     return userRepository.getUserById(id);
//   }

//   async createUser(name: string, email: string) {
//     return userRepository.createUser(name, email);
//   }

//   async updateUser(id: number, name: string, email: string) {
//     return userRepository.updateUser(id, name, email);
//   }

//   async deleteUser(id: number) {
//     return userRepository.deleteUser(id);
//   }

class DataQueryService {
  async dataQuery(datasetId: string, select_d: string[], select_m: string[]) {
    return dataQueryRepository.dataQuery(DBMAP[datasetId], select_d, select_m);
  }
}
export default DataQueryService;
