import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from "@angular/core";
import {LoginService} from "../services";

@Directive({
  selector: '[ifAuthenticated]'
})
export class IfAuthenticatedDirective implements OnInit {
  private hasView: boolean;
  isAuthenticated: boolean;

  constructor(
    private loginService: LoginService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  ngOnInit(): void {

  }

    @Input() set ifAuthenticated(condition: boolean) {
      if(condition) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (!condition) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    }
}
