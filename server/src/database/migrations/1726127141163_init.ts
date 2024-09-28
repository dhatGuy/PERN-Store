import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  // Product table
  await db.schema
    .createTable("product")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("slug", "varchar", (col) => col.notNull())
    .addColumn("price", "real", (col) => col.notNull())
    .addColumn("description", "text", (col) => col.notNull())
    .addColumn("imageUrl", "varchar", (col) => col.notNull())
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  // Role enum
  await db.schema
    .createType("user_role")
    .asEnum(["admin", "customer"])
    .execute();

  // User table
  await db.schema
    .createTable("user")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("password", "varchar", (col) => col.notNull())
    .addColumn("email", "varchar", (col) => col.notNull().unique())
    .addColumn("fullname", "varchar", (col) => col.notNull())
    .addColumn("username", "varchar", (col) => col.notNull().unique())
    .addColumn("google_id", "varchar", (col) => col.unique())
    .addColumn("roles", sql`user_role`, (col) =>
      col.notNull().defaultTo(sql`'customer'`)
    )
    .addColumn("address", "varchar")
    .addColumn("city", "varchar")
    .addColumn("state", "varchar")
    .addColumn("country", "varchar")
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  // User index enforcing unique lowercase email
  await db.schema
    .createIndex("user_unique_lower_email_idx")
    .on("user")
    .column("email")
    .unique()
    .execute();

  // User index enforcing unique lowercase username
  await db.schema
    .createIndex("user_unique_lower_username_idx")
    .on("user")
    .column("username")
    .unique()
    .execute();

  // Cart table
  await db.schema
    .createTable("cart")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("user_id", "uuid", (col) =>
      col.notNull().references("user.id").onDelete("cascade")
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  // Cart item table
  await db.schema
    .createTable("cart_item")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("cart_id", "integer", (col) =>
      col.notNull().references("cart.id").onDelete("cascade")
    )
    .addColumn("product_id", "integer", (col) =>
      col.notNull().references("product.id").onDelete("cascade")
    )
    .addColumn("quantity", "integer", (col) =>
      col.notNull().check(sql`quantity > 0`)
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  // Payment method enum
  await db.schema
    .createType("payment_method")
    .asEnum(["PAYSTACK", "STRIPE"])
    .execute();

  // Order table
  await db.schema
    .createTable("order")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("user_id", "uuid", (col) =>
      col.notNull().references("user.id").onDelete("cascade")
    )
    .addColumn("amount", "real", (col) => col.notNull())
    .addColumn("status", "varchar", (col) => col.notNull())
    .addColumn("payment_method", sql`payment_method`, (col) => col.notNull())
    .addColumn("payment_reference", "varchar", (col) => col.notNull())
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  // Order item table
  await db.schema
    .createTable("order_item")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("order_id", "integer", (col) =>
      col.notNull().references("order.id").onDelete("cascade")
    )
    .addColumn("product_id", "integer", (col) =>
      col.notNull().references("product.id").onDelete("cascade")
    )
    .addColumn("quantity", "integer", (col) => col.notNull())
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  // Review table
  await db.schema
    .createTable("review")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("user_id", "uuid", (col) =>
      col.notNull().references("user.id").onDelete("cascade")
    )
    .addColumn("product_id", "integer", (col) =>
      col.notNull().references("product.id").onDelete("cascade")
    )
    .addColumn("rating", "integer", (col) => col.notNull())
    .addColumn("comment", "text", (col) => col.notNull())
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  // Reset token table
  await db.schema
    .createTable("reset_token")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("email", "varchar", (col) => col.notNull())
    .addColumn("used", "boolean", (col) => col.defaultTo(false).notNull())
    .addColumn("expiration", "timestamp", (col) => col.notNull())
    .addColumn("token", "varchar", (col) => col.notNull())
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("reset_token").execute();
  await db.schema.dropTable("review").execute();
  await db.schema.dropTable("order_item").execute();
  await db.schema.dropTable("order").execute();
  await db.schema.dropTable("cart_item").execute();
  await db.schema.dropTable("cart").execute();
  await db.schema.dropTable("product").execute();
  await db.schema.dropTable("user").execute();

  await db.schema.dropType("payment_method").execute();
  await db.schema.dropType("user_role").execute();
}
