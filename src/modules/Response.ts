export class ApiResponse {
    response: string
    data?:Record<string, any>
    error?:string
    constructor( response: string, data?: Record<string, any>, error?: Error) {
      this.response = response;
      this.data = data;
      this.error = error?.message;
    }
  }
  
//   //module.exports = {
//     ApiResponse
//   };