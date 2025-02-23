import User from '../../models/user.js';
import Nationality from '../../enums/nationality.js';
import { GraphQLError } from 'graphql';

interface GetUserArgs {
  id: string;
}

interface CreateUserArgs {
  name: string;
  username: string;
  age: number;
  nationality: Nationality;
  [key: string]: any;
}

interface UpdateUserArgs {
  id: string;
  name: string;
  username: string;
  age: number;
  nationality: Nationality;
  [key: string]: any;
}

interface DeleteUserArgs {
  id: string;
}

const userResolvers = {
  Nationality: Nationality,

  Query: {
    getUsers: async (): Promise<any[]> => {
      try {
        return await User.find();
      } catch (err: unknown) {
        throw new GraphQLError(
          `Error fetching users: ${(err as Error).message}`
        );
      }
    },

    getUser: async (_: any, args: GetUserArgs): Promise<any> => {
      try {
        const foundedUser = await User.findById(args.id);
        if (!foundedUser) {
          throw new GraphQLError('User not found');
        }
        return foundedUser;
      } catch (err: unknown) {
        throw new GraphQLError(
          `Error fetching user: ${(err as Error).message}`
        );
      }
    },
  },

  Mutation: {
    createUser: async (_: any, args: CreateUserArgs): Promise<any> => {
      try {
        const user = new User(args);
        return await user.save();
      } catch (err: unknown) {
        throw new GraphQLError(
          `Failed to create user: ${(err as Error).message}`
        );
      }
    },

    updateUser: async (_: any, args: UpdateUserArgs): Promise<any> => {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          args.id,
          args,
          { new: true }
        );
        if (!updatedUser) {
          throw new GraphQLError('User not found for update');
        }
        return updatedUser;
      } catch (err: unknown) {
        throw new GraphQLError(
          `Failed to update user: ${(err as Error).message}`
        );
      }
    },



    deleteUser: async (_: any, args: DeleteUserArgs): Promise<boolean> => {
      try {
        const deletedUser = await User.findByIdAndDelete(args.id);
        if (!deletedUser) {
          throw new GraphQLError('User not found for deletion');
        }
        return true;
      } catch (err: unknown) {
        throw new GraphQLError(
          `Failed to delete user: ${(err as Error).message}`
        );
      }
    },
  },
};

export default userResolvers;
