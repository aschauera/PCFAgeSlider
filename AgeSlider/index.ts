import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class AgeSlider implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	labelElement: any;
	inputElement: any;
	private _min: number;
	private _max: number;
	private _refreshData: (evt: Event) => void;
	private _notifyOutputChanged: () => void;
	private _container: HTMLDivElement;
	private _context: ComponentFramework.Context<IInputs>;
	private _value: number;

	constructor()
	{

	}


	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
	{
		this._context = context;
		this._container = document.createElement("div");
		this._notifyOutputChanged = notifyOutputChanged;
		this._refreshData = this.refreshData.bind(this);

		// HTML elemente generieren
		this.inputElement = document.createElement("input");
		this.inputElement.setAttribute("type", "range");
		this.inputElement.addEventListener("input", this._refreshData);
		this._min= context.parameters.mimimum.raw!;
		this._max=context.parameters.maximum.raw!;
		this.inputElement.setAttribute("min", this._min.toString());
		this.inputElement.setAttribute("max", this._max.toString());
		this.inputElement.setAttribute("class", "linearslider");
		this.inputElement.setAttribute("id", "linearrangeinput");
		//Label
		this.labelElement = document.createElement("label");
		this.labelElement.setAttribute("class", "LinearRangeLabel");
		this.labelElement.setAttribute("id", "lrclabel");

		// Control wert auslesen und setzen
		this._value = context.parameters.controlValue.raw!;
		this.inputElement.setAttribute("value", context.parameters.controlValue.formatted ? context.parameters.controlValue.formatted : "0");
		this.labelElement.innerHTML = context.parameters.controlValue.formatted ? context.parameters.controlValue.formatted : "0";

		// HTML Elememnte ins DIV einfügen
		this._container.appendChild(this.inputElement);
		this._container.appendChild(this.labelElement);
		container.appendChild(this._container);
	}
	
	public refreshData(evt: Event): void {
		this._value = (this.inputElement.value as any) as number;
		this.labelElement.innerHTML = this.inputElement.value;
		this._notifyOutputChanged();
	}

	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		this._value = context.parameters.controlValue.raw!;
		this._context = context;
		this.inputElement.setAttribute("value", context.parameters.controlValue.formatted ? context.parameters.controlValue.formatted : "");
		this.labelElement.innerHTML = context.parameters.controlValue.formatted ? context.parameters.controlValue.formatted : "";

	}

	public getOutputs(): IOutputs
	{
		return {};
	}

	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}
