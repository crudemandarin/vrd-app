import { IEventBus, Registry, Subscriber } from "../models/event-bus.model";

export class EventBus implements IEventBus {
	private subscribers: Subscriber;
	private static nextId = 0;
	private static instance?: EventBus = undefined;

	private constructor() {
		this.subscribers = {};
	}

	public static getInstance(): EventBus {
		if (this.instance === undefined) {
			this.instance = new EventBus();
		}

		return this.instance;
	}

	public dispatch<T>(event: string, arg?: T): void {
		const subscriber = this.subscribers[event];

		if (subscriber === undefined) {
			return;
		}

		Object.keys(subscriber).forEach((key) => subscriber[key](arg));
	}

	public register(event: string, callback: (args: unknown) => void): Registry {
		const id = this.getNextId();
		if (!this.subscribers[event]) this.subscribers[event] = {};

		this.subscribers[event][id] = callback;

		return {
			unregister: () => {
				delete this.subscribers[event][id];
				if (Object.keys(this.subscribers[event]).length === 0)
					delete this.subscribers[event];
			}
		};
	}

	private getNextId(): number {
		return EventBus.nextId++;
	}
}
