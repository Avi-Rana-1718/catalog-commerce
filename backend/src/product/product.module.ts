import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
    imports: [
        MulterModule.register({
          storage: diskStorage({
            destination: './uploads', // Specify the directory to save the files
            filename: (req, file, callback) => {
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
              const ext = extname(file.originalname);
              const filename = `${uniqueSuffix}${ext}`;
              callback(null, filename); // Set the file name
            },
          }),
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname,"..", "..", '/uploads'),
            serveRoot: "/uploads"
          }),
      ],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule {}