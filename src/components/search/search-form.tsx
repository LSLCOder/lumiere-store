import Form from "next/form";
import { Button } from "@/components/ui/button";

type SearchFormProps = {
  /** The current search, so the field shows what was searched for. */
  defaultValue?: string;
};

/**
 * A GET form that loads `/search?q=…`. `next/form` makes the submit a
 * client-side navigation; without JavaScript it is a normal form.
 */
export function SearchForm({ defaultValue = "" }: SearchFormProps) {
  return (
    <Form action="/search" role="search" className="flex">
      <label htmlFor="search-query" className="sr-only">
        Search products
      </label>
      <input
        id="search-query"
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder="Linen, stoneware, candles…"
        autoComplete="off"
        maxLength={100}
        className="field min-w-0 flex-1"
      />
      <Button type="submit" className="shrink-0">
        Search
      </Button>
    </Form>
  );
}
