import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }

  validateAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup || control instanceof UntypedFormArray) {
        control.markAsTouched({ onlySelf: true });
        this.validateAllFormFields(control);
      }
    });
  }

  public getErrorMessage(formGroup: UntypedFormGroup, fieldName: string) {
    const field = formGroup.get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  public getErrorMessageFromField(field: UntypedFormControl) {
    // a interrogação abstrai a checagem if field != null && (que precisa ser feita senão dá erro)
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    // obrigatório letra minúscula
    if (field?.hasError('minlength')) {
      const requiredLength: number = field.errors ? field.errors['minlength']['requiredLength'] : 5; // obrigatório letra minúscula minlength
      return `Tamanho mínimo deve ser de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength: number = field.errors ? field.errors['maxlength']['requiredLength'] : 50;
      return `Tamanho máximo deve ser de ${requiredLength} caracteres.`;
    }

    return 'Campo inválido';
  }

  getFormArrayFieldErrorMessage(formGroup: UntypedFormGroup, formArrayName: string, fieldName: string, index: number) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    const field = formArray.at(index).get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  isFormArrayRequiredAndTouched(formGroup: UntypedFormGroup, formArrayName: string) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    return formArray.hasError('required') && formArray.touched;
  }
}
