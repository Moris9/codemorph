import { Parameters } from "../morph";
import { EditFileEffect } from "../morph/interfaces/morph.interface";
import { addClassToDeclarationsAndImports, componentEffects, fileToAddClassToDeclarationsAndImports } from "./effects/component/component-effects";
import { exportDirectiveFile } from "./effects/directive/directive";
import { exportGraphqlFile } from "./effects/graphql/graphql";
import { exportInterfaceFile } from "./effects/interface/interface";
import { addEffectToNgModule } from "./effects/ngrx/effects/ngrx-effects";
import { addFacadeToNgModule } from "./effects/ngrx/facade/ngrx-facade";
import { addReducerToNgModule } from "./effects/ngrx/reducer/ngrx-reducer";
import { exportServiceFile } from "./effects/service/service";
import { exportComponentFile } from "./effects/standalone-component/standalone-component";
import { AngularType, AngularTypeNames, AngularOptionalType } from "./types/types";

export function angularFilesToAffect(filePathWithName: string, fileTree: string[], type: AngularTypeNames, optionalTypes: AngularOptionalType[]): string[] {
  switch(type) {
    case AngularTypeNames.Component:
      return fileToAddClassToDeclarationsAndImports(filePathWithName, fileTree, optionalTypes);
    default:
      return [];
  }
}

export function angularStandaloneEffects(type: AngularTypeNames, fileEffects: EditFileEffect[]): EditFileEffect[] {
  switch(type) {
    case AngularTypeNames.Component:
      return componentEffects(fileEffects);
    default:
      return [];
  }
}

export function angularEffects(filePathWithName: string, type: AngularTypeNames, parameters: Parameters, optionalTypes: AngularOptionalType[]): void {
  switch (type) {
    case AngularTypeNames.Component:
      addClassToDeclarationsAndImports(filePathWithName, (parameters as any).className, optionalTypes);
      break;
    case AngularTypeNames.StandaloneComponent:
      exportComponentFile(filePathWithName)
      break;
    case AngularTypeNames.Service:
      exportServiceFile(filePathWithName);
      break;
    case AngularTypeNames.Interface:
      exportInterfaceFile(filePathWithName)
      break;
    case AngularTypeNames.Graphql:
      exportGraphqlFile(filePathWithName)
      break;
    case AngularTypeNames.NgrxEffects:
      addEffectToNgModule(filePathWithName, (parameters as any).className)
      break;
    case AngularTypeNames.NgrxFacade:
      addFacadeToNgModule(filePathWithName, (parameters as any).className)
      break;
    case AngularTypeNames.NgrxReducer:
      addReducerToNgModule(filePathWithName, (parameters as any).className, (parameters as any).constantName)
      break;
    case AngularTypeNames.Directive:
      exportDirectiveFile(filePathWithName);
      break;
  }
}