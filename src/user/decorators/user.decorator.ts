import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string | string[], ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    if (typeof data === 'object') {
      const datas: object[] = [];
      data.forEach((key) => {
        datas.push({
          [key]: user[key],
        });
      });
      return datas;
    }
    return data ? user[data] : user;
  },
);
