import { ProjectContributorModel } from 'src/models/ProjectContributor.model'
import { ProjectModel } from 'src/models/Project.model'
import { OrganizationContributorModel } from 'src/models/OrganizationContributor.model'
import { OrganizationModel } from 'src/models/Organization.model'
import { EntityModel } from 'src/models/Entity.model'
import { UserModel } from 'src/models/User.model'
import { AuthModel } from 'src/models/Auth.model'

export const AllModels = [
  AuthModel,
  ProjectContributorModel,
  ProjectModel,
  OrganizationContributorModel,
  OrganizationModel,
  EntityModel,
  UserModel,
]
