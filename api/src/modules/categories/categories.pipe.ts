// @Injectable()
// export class CategoriesCreatePipe implements PipeTransform {
//   transform(value: any) {
//     const parsedValue = categoriesCreateSchema.safeParse(value);

//     if (parsedValue.success) {
//       return parsedValue.data;
//     }

//     //@ts-ignore
//     throw new BadRequestException(parsedValue.error);
//   }
// }

// @Injectable()
// export class CategoriesUpdatePipe implements PipeTransform {
//   transform(value: any) {
//     const parsedValue = categoriesUpdateSchema.safeParse(value);

//     if (parsedValue.success) {
//       return parsedValue.data;
//     }

//     throw new BadRequestException('Invalid payload');
//   }
// }
