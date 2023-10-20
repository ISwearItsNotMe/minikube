import { Module } from '@nestjs/common';
import { UnitsModule } from './units/units.module';
import { RecipesModule } from './recipes/recipes.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [
    CategoriesModule,
    RecipesModule,
    IngredientsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'minikube_db',
      port: 5432,
      username: 'minikube_user',
      password: 'minikube_password',
      database: 'minikube_recipes',
      synchronize: false,
      autoLoadEntities: true,
    }),
    UnitsModule,
  ],
})
export class AppModule {}
