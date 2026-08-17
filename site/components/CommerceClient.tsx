"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "../lib/products";

const CART_KEY = "jasonpro-cart-v1";

type CartItem = { slug: string; name: string; priceLabel: string; qty: number };

export function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const add = () => {
    const current: CartItem[] = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    const existing = current.find((item) => item.slug === product.slug);
    if (existing) existing.qty += 1;
    else current.push({ slug: product.slug, name: product.name, priceLabel: product.priceLabel, qty: 1 });
    localStorage.setItem(CART_KEY, JSON.stringify(current));
    window.dispatchEvent(new Event("jasonpro-cart-change"));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };
  return <button className="commerce-primary" onClick={add}>{added ? "ADDED TO CART ✓" : "ADD TO CART →"}</button>;
}

export function CartCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const sync = () => {
      const items: CartItem[] = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      setCount(items.reduce((sum, item) => sum + item.qty, 0));
    };
    sync();
    window.addEventListener("jasonpro-cart-change", sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener("jasonpro-cart-change", sync); window.removeEventListener("storage", sync); };
  }, []);
  return <span>{count}</span>;
}

export function CartExperience() {
  const [items, setItems] = useState<CartItem[]>([]);
  const sync = () => setItems(JSON.parse(localStorage.getItem(CART_KEY) || "[]"));
  useEffect(() => { sync(); }, []);
  const setQty = (slug: string, qty: number) => {
    const next = items.map((item: CartItem) => item.slug === slug ? { ...item, qty: Math.max(0, qty) } : item).filter((item: CartItem) => item.qty > 0);
    setItems(next); localStorage.setItem(CART_KEY, JSON.stringify(next)); window.dispatchEvent(new Event("jasonpro-cart-change"));
  };
  if (!items.length) return <div className="cart-empty"><span>YOUR CART IS EMPTY</span><h2>Choose a product or start with a project brief.</h2><div><Link href="/shop" className="commerce-primary">EXPLORE SHOP →</Link><Link href="/contact" className="commerce-secondary">START A PROJECT</Link></div></div>;
  return <div className="cart-layout"><div className="cart-lines">{items.map((item: CartItem) => <article key={item.slug}><div><small>PRODUCT</small><h2>{item.name}</h2><span>{item.priceLabel}</span></div><div className="qty-control"><button onClick={() => setQty(item.slug, item.qty - 1)}>−</button><b>{item.qty}</b><button onClick={() => setQty(item.slug, item.qty + 1)}>+</button></div></article>)}</div><aside className="cart-summary"><small>ORDER SUMMARY</small><h2>{items.reduce((s: number,i: CartItem)=>s+i.qty,0)} item{items.reduce((s: number,i: CartItem)=>s+i.qty,0) === 1 ? "" : "s"}</h2><p>Final prices, taxes, delivery and payment terms will be confirmed before a live transaction is processed.</p><Link href="/checkout" className="commerce-primary">CONTINUE TO CHECKOUT →</Link></aside></div>;
}

export function CheckoutExperience() {
  const [submitted, setSubmitted] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => setItems(JSON.parse(localStorage.getItem(CART_KEY) || "[]")), []);
  const count = useMemo(() => items.reduce((s: number,i: CartItem)=>s+i.qty,0), [items]);
  if (submitted) return <div className="checkout-success"><span>REQUEST RECEIVED</span><h1>Checkout details captured.</h1><p>This prototype does not charge a card. The production payment provider will be connected only after eligibility, settlement and recurring-billing requirements are verified.</p><Link href="/" className="commerce-primary">RETURN HOME →</Link></div>;
  return <div className="checkout-layout"><form onSubmit={(e: FormEvent<HTMLFormElement>)=>{e.preventDefault();setSubmitted(true);}} className="checkout-form"><span>SECURE CHECKOUT / PROTOTYPE</span><h1>Complete your request.</h1><div className="checkout-grid"><label>Full name<input required name="name" /></label><label>Email<input required type="email" name="email" /></label><label>Phone<input name="phone" /></label><label>Country<input defaultValue="Botswana" name="country" /></label></div><label>Order / project notes<textarea rows={5} name="notes" /></label><button className="commerce-primary" type="submit">SUBMIT CHECKOUT REQUEST →</button><p className="commerce-fineprint">No card data is collected in this build. Payment processing is intentionally disabled until a provider is selected and configured.</p></form><aside className="checkout-summary"><small>YOUR CART</small><h2>{count} item{count===1?"":"s"}</h2>{items.map((item: CartItem)=><div key={item.slug}><span>{item.name}</span><b>× {item.qty}</b></div>)}<Link href="/cart">← EDIT CART</Link></aside></div>;
}

export function PortalPrototype() {
  const [tab,setTab]=useState("projects");
  return <div className="portal-shell"><aside><span>CLIENT SPACE</span><h2>JASONPRO</h2>{["projects","files","invoices","support"].map((item)=><button key={item} className={tab===item?"active":""} onClick={()=>setTab(item)}>{item.toUpperCase()}</button>)}</aside><section><div className="portal-top"><div><small>PROTOTYPE PORTAL</small><h1>{tab.charAt(0).toUpperCase()+tab.slice(1)}</h1></div><span>AUTHENTICATION NOT CONNECTED</span></div>{tab==="projects"&&<div className="portal-project"><small>HOW THIS WILL WORK</small><h2>One place for briefs, milestones, approvals and deliverables.</h2><div className="portal-timeline"><i/><span>Discovery</span><i/><span>Design</span><i/><span>Build</span><i/><span>Launch</span></div></div>}{tab==="files"&&<div className="portal-placeholder"><b>FILES + DELIVERABLES</b><p>Signed upload/download access will live here once storage and authentication are connected.</p></div>}{tab==="invoices"&&<div className="portal-placeholder"><b>INVOICES + PAYMENTS</b><p>Invoice status, deposits, milestones and receipts will be shown here after the payment layer is connected.</p></div>}{tab==="support"&&<div className="portal-placeholder"><b>SUPPORT</b><p>Project questions, revision requests and support tickets will be managed here.</p></div>}</section></div>;
}
