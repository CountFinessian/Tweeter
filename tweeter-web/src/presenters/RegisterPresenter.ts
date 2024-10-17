import { Buffer } from "buffer";
import { SetStateAction } from "react";
import { AuthPresenter, AuthView } from "./AuthPresenter";

export interface RegisterView extends AuthView {
    setImageUrl(url: string): void;
    setImageBytes(bytes: Uint8Array) : void;
    setImageFileExtension: (extension: SetStateAction<string>) => void;
  }

export class RegisterPresenter extends AuthPresenter {
  
  protected get registerView(): RegisterView {
    return this.view as RegisterView;
}

public handleImageFile (file: File | undefined)  {
    if (file) {
      this.registerView.setImageUrl(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const imageStringBase64 = event.target?.result as string;

        // Remove unnecessary file metadata from the start of the string.
        const imageStringBase64BufferContents =
          imageStringBase64.split("base64,")[1];

        const bytes: Uint8Array = Buffer.from(
          imageStringBase64BufferContents,
          "base64"
        );

        this.registerView.setImageBytes(bytes);
      };
      reader.readAsDataURL(file);

      // Set image file extension (and move to a separate method)
      const fileExtension = this.getFileExtension(file);
      if (fileExtension) {
        this.registerView.setImageFileExtension(fileExtension);
      }
    } else {
      this.registerView.setImageUrl("");
      this.registerView.setImageBytes(new Uint8Array());
    }
  };

  public getFileExtension (file: File): string | undefined {
    return file.name.split(".").pop();
  };

  public async doRegister (
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    imageBytes: Uint8Array,
    imageFileExtension: string,
    rememberMe: boolean) {

      this.doFailureReportingOperation(async () => {
        const [user, authToken] = await this.service.register(
          firstName,
          lastName,
          alias,
          password,
          imageBytes,
          imageFileExtension
        );
  
        this.registerView.updateUserInfo(user, user, authToken, rememberMe);
        this.registerView.navigate("/");
      }, "register user");
  };
}